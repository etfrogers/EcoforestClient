import calendar
import datetime
import inspect
import os
import pathlib
from typing import Tuple

import requests

import numpy as np
import yaml
from matplotlib.dates import DateFormatter

from ecoforest.history_dataset import ChunkClass, DayData, CompositeDataSet, MonthDataSet

CSV_DATE_FORMAT = '%Y/%m/%d %H:%M:%S'
TIME_FORMAT = DateFormatter("%H:%M")




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


def date_range(start_date: datetime.date, end_date: datetime.date):
    date = start_date
    while date <= end_date:
        yield date
        date += datetime.timedelta(days=1)


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
