import calendar
import datetime
import functools
import inspect
import os
import pathlib
import ssl
from abc import abstractmethod
from enum import Enum
from functools import partial
from typing import Sequence, AnyStr, Dict, Union, Set, Tuple, List

import requests

import numpy as np
import matplotlib.pyplot as plt
import yaml
from matplotlib.dates import DateFormatter

CSV_DATE_FORMAT = '%Y/%m/%d %H:%M:%S'
EXPLORE_UNUSED_DATA = False
TIME_FORMAT = DateFormatter("%H:%M")


class BaseDataset:
    # indices taken from Javascript plotting code
    # (need to subtract 2 from the indices used there to allow for serial and timestamp)
    MAPPING = {24: 'consumption',
               25: 'heating',
               26: 'cooling',
               10: 'dhw_temp',
               # no index for 'pool'
               13: 'heating_buffer_temp',
               14: 'cooling_buffer_temp',
               15: 'production_supply',
               16: 'production_return',
               17: 'brine_supply',
               18: 'brine_return',
               11: 'outdoor_temp',
               19: 'zone_1',
               20: 'zone_2',
               21: 'zone_3',
               22: 'zone_4',
               }

    @property
    @abstractmethod
    def timestamps(self):
        raise NotImplementedError()

    @property
    @abstractmethod
    def data(self):
        raise NotImplementedError()

    @property
    def length(self) -> datetime.timedelta:
        return self.timestamps[-1] - self.timestamps[0]

    @staticmethod
    def total_power(series: np.ndarray):
        # 5 minute intervals, means 12 to an hour, so one 1kW at one point is 1/12 kWh
        return np.sum(series) / 12

    def heating_power_of_type(self, type_: 'ChunkClass'):
        return sum([c.total_heating for c in self.chunks() if c.type is type_])

    @property
    def total_consumption(self):
        return self.total_power(self.consumption)

    @property
    def total_heating(self):
        return self.total_power(self.heating)

    def cop(self, type_: 'ChunkClass' = None):
        if type_ is None:
            return self.heating / self.consumption
        else:
            chunks = [chunk for chunk in self.chunks() if chunk.type == type_]
            if chunks:
                return np.average([chunk.mean_cop() for chunk in chunks],
                                  weights=[chunk.length for chunk in chunks])
            else:
                return 0.0

    def mean_cop(self, type_: 'ChunkClass' = None):
        if self.total_heating == 0:
            return 0
        else:
            return np.nanmean(self.cop(type_))

    @functools.cache
    def chunks(self) -> list['DataChunk']:
        return list(self._chunk_generator())

    def _chunk_generator(self):
        is_on = (self.consumption != 0).astype(int)
        switches = np.diff(is_on)
        starts = np.nonzero(switches == 1)[0]
        ends = np.nonzero(switches == -1)[0]
        # line below will fail if the heat pump is on over midnight.
        # If this occurs a special case will be needed
        assert starts.size == ends.size
        # returns inclusive inds (first non element and last nonzero element)
        for start_ind, end_ind in zip(starts + 1, ends):
            yield DataChunk(self.timestamps[start_ind:end_ind + 1], self.data[start_ind:end_ind + 1])

    @property
    def is_empty(self):
        return len(self.timestamps) == 0


class Dataset(BaseDataset):
    def __init__(self, timestamps, data):
        self.heating = self.consumption = self.cooling = None
        self.dhw_temp = self.heating_buffer_temp = self.cooling_buffer_temp = None
        self.production_supply = self.production_return = self.brine_supply = self.brine_return = None
        self.outdoor_temp = None

        self._timestamps = timestamps
        self._data = data
        for index, name in self.MAPPING.items():
            setattr(self, name, self.data[:, index])

    @property
    def timestamps(self):
        return self._timestamps

    @property
    def data(self):
        return self._data


class ChunkClass(Enum):
    DHW = 0
    HEATING = 1
    COMBINED = 2
    SOLAR_DHW = 3
    SOLAR_HEATING = 4
    SOLAR_COMBINED = 5
    LEGIONNAIRES = 6
    LEGIONNAIRES_COMBINED = 7
    UNKNOWN = 8

    @classmethod
    def solar_types(cls):
        return {ChunkClass.SOLAR_HEATING, ChunkClass.SOLAR_DHW, ChunkClass.SOLAR_COMBINED}

    @classmethod
    def heating_types(cls):
        return {ChunkClass.SOLAR_HEATING, ChunkClass.HEATING}

    @classmethod
    def dhw_types(cls):
        return {ChunkClass.DHW, ChunkClass.SOLAR_DHW}

    @classmethod
    def legionnaires_types(cls):
        return {ChunkClass.LEGIONNAIRES, ChunkClass.LEGIONNAIRES_COMBINED}


TANK_OFFSET_TEMP = 5
DHW_OFFSET_TEMP = 4
DHW_SOLAR_SETPOINT = 55
DHW_LEGIONNAIRES_SETPOINT = 65
HEATING_SOLAR_SETPOINT = 60
DHW_SETPOINT = 48
TEMPERATURE_TOLERANCE = 2


class ChunkTypeError(Exception):
    pass


class DataChunk(Dataset):

    def __init__(self, *args, **kwargs):
        super(DataChunk, self).__init__(*args, **kwargs)
        assert not np.any(np.isnan(self.cop()))

    def cop(self, type_: 'ChunkClass' = None):
        if type_ is not None:
            raise ValueError('Unexpected argument to chunk COP')
        return self.heating / self.consumption

    @property
    def type(self) -> ChunkClass:
        dhw_solar = dwh_legionnaires = heating_solar = False
        dhw_diff = self.dhw_temp[-1] - self.dhw_temp[0]
        dhw_increased = dhw_diff > DHW_OFFSET_TEMP - TEMPERATURE_TOLERANCE
        if dhw_increased:
            print(f'End temp: {self.dhw_temp[-1]}')
            dhw_solar = DHW_SOLAR_SETPOINT < self.dhw_temp[-1] < DHW_LEGIONNAIRES_SETPOINT
            dwh_legionnaires = self.dhw_temp[-1] > DHW_LEGIONNAIRES_SETPOINT - TEMPERATURE_TOLERANCE

        heating_diff = self.heating_buffer_temp[-1] - self.heating_buffer_temp[0]
        heating_increased = heating_diff > TANK_OFFSET_TEMP - TEMPERATURE_TOLERANCE
        if heating_increased:
            heating_solar = self.heating_buffer_temp[-1] > HEATING_SOLAR_SETPOINT - TEMPERATURE_TOLERANCE

        if dwh_legionnaires:
            if heating_increased:
                return ChunkClass.LEGIONNAIRES_COMBINED
            else:
                return ChunkClass.LEGIONNAIRES
        elif dhw_solar:
            if heating_increased:
                return ChunkClass.SOLAR_COMBINED
            else:
                return ChunkClass.SOLAR_DHW
        elif dhw_increased:
            assert not heating_solar
            if heating_increased:
                return ChunkClass.COMBINED
            else:
                return ChunkClass.DHW
        elif heating_solar:
            assert not dhw_increased
            return ChunkClass.SOLAR_HEATING
        elif heating_increased:
            assert not dhw_increased
            return ChunkClass.HEATING
        else:
            print(dhw_diff, heating_diff)
            return ChunkClass.UNKNOWN


class DayData(Dataset):
    def __init__(self, timestamps, full_data):
        super().__init__(timestamps, full_data)

        if EXPLORE_UNUSED_DATA:
            self.explore_unused()

    def explore_unused(self):
        speeds = [7, 8]
        plt.figure()
        for i in speeds:
            plt.plot(self.timestamps, self.data[:, i] / 10, label=str(i))
        plt.gca().xaxis.set_major_formatter(TIME_FORMAT)
        plt.legend()
        plt.title('Speeds')
        unused_indices = np.array([i for i in range(self.data.shape[1])
                                   if not (i in self.MAPPING.keys() or i in speeds)])

        plt.figure()
        for i in unused_indices:
            data = self.data[:, i] / 10
            if np.all(np.isclose(data, 0)):
                continue
            plt.plot(self.timestamps, data, label=str(i))
        plt.gca().xaxis.set_major_formatter(TIME_FORMAT)
        plt.legend()

    def plot(self, axes=None):
        if axes is None:
            plt.figure()
            ax1 = plt.subplot(1, 1, 1)
            ax2 = ax1.twinx()
        else:
            ax1, ax2 = axes
        ax1.plot(self.timestamps, self.consumption, label=f'Electrical power: {self.total_consumption:.2f} kWh',
                 color='red')
        ax1.plot(self.timestamps, self.heating, label=f'Heating power: {self.total_heating:.2f} kWh',
                 color='lightgreen')
        ax1.set_ylabel('kW')
        ax2.plot(self.timestamps, self.cop(), label=f'Mean COP: {self.mean_cop():.2f}')
        ax1.legend(loc='upper right')
        ax2.legend(loc='upper left')
        # plt.suptitle(f'{self.date_str}')
        ax1.xaxis.set_major_formatter(TIME_FORMAT)

        x_data = []
        y_data = []
        labels = []
        properties = []
        for chunk in self.chunks():
            x_data.append(chunk.timestamps[0])
            y_data.append(np.max(chunk.heating) + 0.1)
            label = (f'{chunk.total_consumption:.1f} kWh\n'
                     + f'PF: {chunk.mean_cop():.2f}')
            labels.append(label)
            props = dict()
            try:
                chunk_type = chunk.type
            except ChunkTypeError:
                props.update({'backgroundcolor': 'red'})
            else:
                if chunk_type in ChunkClass.legionnaires_types():
                    props.update({'backgroundcolor': 'blue'})
                elif chunk_type in ChunkClass.heating_types():
                    props.update({'color': 'red'})
                elif chunk_type in ChunkClass.dhw_types():
                    props.update({'color': 'blue'})
                if chunk_type in ChunkClass.solar_types():
                    props.update({'bbox': {'edgecolor': 'green', 'facecolor': 'white'}})

            properties.append(props)
        txt_height = 0.07 * (ax1.get_ylim()[1] - ax1.get_ylim()[0])
        txt_width = datetime.timedelta(hours=1)
        # Get the corrected text positions, then write the text.
        text_positions = get_text_positions(x_data, y_data, txt_width, txt_height)
        text_plotter(x_data, y_data, labels, text_positions, ax1, txt_width, txt_height, properties)

        plt.figure()
        plt.plot(self.timestamps, self.dhw_temp, label='DHW')
        plt.plot(self.timestamps, self.heating_buffer_temp, label='Heating Buffer')
        plt.plot(self.timestamps, self.production_supply, label='Production Flow')
        plt.plot(self.timestamps, self.production_return, label='Production Return')
        plt.plot(self.timestamps, self.brine_supply, label='Brine Return')
        plt.plot(self.timestamps, self.brine_return, label='Brine Return')
        plt.gca().xaxis.set_major_formatter(TIME_FORMAT)
        plt.legend()

        plt.figure()
        plt.plot(self.timestamps, self.outdoor_temp, label='Outdoor')
        plt.gca().xaxis.set_major_formatter(TIME_FORMAT)
        plt.legend()

        plt.show()
        return [ax1, ax2]


class EcoforestClient:

    def __init__(self, server, port, serial_number, auth_key):
        self.server = server
        self.port = port
        self.serial_number = serial_number
        self.auth_key = auth_key

    def get_history_for_date_range(self, dates: Tuple[datetime.date, datetime.date]):
        return CompositeDataSet([self.get_history_for_date(date) for date in date_range(*dates)])

    def get_history_for_month(self, year: int, month: int):
        _, n_days = calendar.monthrange(year, month)
        composite = self.get_history_for_date_range((datetime.date(year, month, 1),
                                                     datetime.date(year, month, n_days)))
        return MonthDataSet(composite.datasets)

    def get_history_for_date(self, date: datetime.date):
        use_cache = True
        if use_cache:
            cache_file = self._history_cache_file(date)
            try:
                with open(cache_file) as file:
                    contents = file.read()
            except FileNotFoundError:
                contents = self.get_history_data_from_server(date)
                if contents and date != datetime.datetime.today().date():
                    # do not cache today's data as it will change
                    with open(cache_file, 'w') as file:
                        file.write(contents)
        else:
            contents = self.get_history_data_from_server(date)
        timestamps, full_data = self.process_file_data(contents)
        return DayData(timestamps, full_data)

    @staticmethod
    def date_str(date: datetime.date):
        return date.strftime('%Y-%m-%d')

    @staticmethod
    def _history_cache_file(date: datetime.date):
        data_dir = pathlib.Path(os.path.dirname(inspect.getsourcefile(lambda: 0))) / 'data'
        return data_dir / f'{EcoforestClient.date_str(date)}.csv'

    def get_history_data_from_server(self, date: datetime.date):
        data_dir = 'historic'
        filename = f'{self.date_str(date)}_{self.serial_number}_1_historico.csv'
        url = f'https://{self.server}:{self.port}/{data_dir}/{filename}'
        ssl_verify = False  # os.path.abspath('easynet2.ecoforest.es.pem')
        response = requests.get(url,
                                verify=ssl_verify,
                                headers={'Authorization': f'Basic {self.auth_key}'},
                                )
        try:
            response.raise_for_status()
        except requests.exceptions.HTTPError:
            if response.status_code == 404:
                return ''
            else:
                raise
        return response.text

    @staticmethod
    def process_file_data(contents):
        headers, *lines = contents.split('\n')
        timestamps = []
        data = []
        for line in lines:
            if line:
                _, timestamp, *entry = line.split(';')[:-1]
                timestamps.append(datetime.datetime.strptime(timestamp, CSV_DATE_FORMAT))
                data.append([float(val) for val in entry])
        if data:
            data = np.array(data) / 10
        else:
            data = np.zeros((0, 30))  # each file has 30 columns, here we set n_rows to 0
        return timestamps, data


def get_text_positions(x_data: Sequence[float], y_data: Sequence[float],
                       txt_width: Union[float, datetime.timedelta], txt_height: float):
    """https://stackoverflow.com/questions/8850142/matplotlib-overlapping-annotations"""
    a = list(zip(y_data, x_data))
    text_positions = y_data.copy()
    for index, (y, x) in enumerate(a):
        local_text_positions = [i for i in a if i[0] > (y - txt_height)
                                and (abs(i[1] - x) < txt_width * 2) and i != (y, x)]
        if local_text_positions:
            sorted_ltp = sorted(local_text_positions)
            if abs(sorted_ltp[0][0] - y) < txt_height:  # True == collision
                differ = np.diff(sorted_ltp, axis=0)
                a[index] = (sorted_ltp[-1][0] + txt_height, a[index][1])
                text_positions[index] = sorted_ltp[-1][0] + txt_height
                for k, (j, m) in enumerate(differ):
                    # j is the vertical distance between words
                    if j > txt_height * 2:  # if True then room to fit a word in
                        a[index] = (sorted_ltp[k][0] + txt_height, a[index][1])
                        text_positions[index] = sorted_ltp[k][0] + txt_height
                        break
    return text_positions


def text_plotter(x_data: Sequence[float], y_data: Sequence[float],
                 labels: Sequence[AnyStr], text_positions: Sequence[float],
                 axis: plt.Axes,
                 txt_width: Union[float, datetime.timedelta], txt_height: float,
                 text_properties: Sequence[Dict], **kwargs):
    """https://stackoverflow.com/questions/8850142/matplotlib-overlapping-annotations"""
    for x, y, l, t, props in zip(x_data, y_data, labels, text_positions, text_properties):
        axis.text(x - txt_width, 1.01*t, l, rotation=0, **props, **kwargs)
        # if y != t:
        #     axis.arrow(x, t, 0, y-t, color='k', alpha=0.3, width=txt_width*0.02,
        #                head_width=txt_width*0.2, head_length=txt_height*0.3,
        #                zorder=0, length_includes_head=True)


class CompositeMeta(type):
    def __new__(cls, clsname, bases, namespace):
        def getter(obj, name):
            return np.concatenate([getattr(ds, name) for ds in obj.datasets])

        new_props = {name:
                     property(fget=partial(getter, name=name))
                     for name in Dataset.MAPPING.values()}
        namespace.update(new_props)
        cls = super(CompositeMeta, cls).__new__(cls, clsname, bases, namespace)
        return cls


class CompositeDataSet(BaseDataset, metaclass=CompositeMeta):
    def __init__(self, datasets):
        super().__init__()
        self.datasets: List[DayData] = datasets

    @property
    def timestamps(self):
        return np.concatenate([ds.timestamps for ds in self.datasets])

    @property
    def data(self):
        return np.concatenate([ds.data for ds in self.datasets])


def date_range(start_date: datetime.date, end_date: datetime.date):
    date = start_date
    while date <= end_date:
        yield date
        date += datetime.timedelta(days=1)


class MonthDataSet(CompositeDataSet):
    @functools.cached_property
    def days(self):
        return np.array([d.timestamps[0].day for d in self.datasets if not d.is_empty])

    def plot_bar_chart(self):
        plt.figure()
        power_bars = stacked_bar(
            self.days,
            # [d.total_heating for d in self.datasets],
            [d.heating_power_of_type(ChunkClass.DHW) for d in self.datasets if not d.is_empty],
            [d.heating_power_of_type(ChunkClass.SOLAR_DHW) for d in self.datasets if not d.is_empty],
            [d.heating_power_of_type(ChunkClass.LEGIONNAIRES) for d in self.datasets if not d.is_empty],
            # [d.total_consumption for d in self.datasets],
            )
        colors = [bars.patches[0]._facecolor for bars in power_bars]
        grouped_bar(self.days,
                    # [-d.mean_cop() for d in self.datasets],
                    [-d.mean_cop(ChunkClass.DHW) for d in self.datasets if not d.is_empty],
                    [-d.mean_cop(ChunkClass.SOLAR_DHW) for d in self.datasets if not d.is_empty],
                    [-d.mean_cop(ChunkClass.LEGIONNAIRES) for d in self.datasets if not d.is_empty],
                    # [d.total_consumption for d in self.datasets],
                    colors=colors,
                    )
        plt.axhline(y=0.0, color='k', linestyle='-')
        plt.show()


def grouped_bar(x, *args, total_width: float = 0.9, colors=None):
    n_bars = len(args)
    width = total_width / n_bars
    for i in range(n_bars):
        pos = i - (n_bars-1)/2
        shift = width * pos
        if colors:
            kwargs = {'color': colors[i]}
        else:
            kwargs = {}
        plt.bar(x + shift,
                args[i],
                width,
                **kwargs)


def stacked_bar(x, *args, total_width: float = 0.9):
    n_bars = len(args)
    bottom = 0
    bars_sets = []
    for i in range(n_bars):
        if i >= 1:
            bottom = args[i-1]
        bars_sets.append(plt.bar(x,
                                 args[i],
                                 total_width,
                                 bottom=bottom,
                                 )
                         )
    return bars_sets


def main():
    year = 2022
    month = 11
    # day = 10
    # datasets = []
    # for day in range(15, 21):
    #     data = DayData(datetime.date(year, month, day))
    #     data.plot()
    #     datasets.append(data)
    with open('ecoforest_config.yml') as file:
        config = yaml.safe_load(file)

    client = EcoforestClient(config['server'], config['port'], config['serial-number'], config['auth-key'])
    dataset = client.get_history_for_month(year, month)
    # for ds in dataset.datasets:
    #     ds.plot()

    print(dataset.mean_cop())
    print(dataset.mean_cop(ChunkClass.DHW))
    print([c.type for c in dataset.chunks()])
    print([d.mean_cop() for d in dataset.datasets])
    dataset.plot_bar_chart()


if __name__ == '__main__':
    main()
