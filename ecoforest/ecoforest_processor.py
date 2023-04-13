import calendar
import datetime
import inspect
import os
import pathlib
import warnings
from typing import Tuple

import requests

import numpy as np
import yaml
from urllib3.exceptions import InsecureRequestWarning

from ecoforest.history_dataset import DayData, CompositeDataSet, MonthDataSet

CSV_DATE_FORMAT = '%Y/%m/%d %H:%M:%S'


class EcoforestClient:
    def __init__(self, server, port, serial_number, auth_key):
        self.server = server
        self.port = port
        self.serial_number = serial_number
        self.auth_key = auth_key
        self._register_values = {}
        self._status = {}

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
        data_dir = pathlib.Path('cache/ecoforest')
        return data_dir / f'{EcoforestClient.date_str(date)}.csv'

    def api_request(self, endpoint, data=None, **kwargs):
        url = f'https://{self.server}:{self.port}/{endpoint}'
        ssl_verify = False  # os.path.abspath('easynet2.ecoforest.es.pem')
        standard_args = {'verify': ssl_verify,
                         'headers': {'Authorization': f'Basic {self.auth_key}'}}
        with warnings.catch_warnings():
            warnings.simplefilter(category=InsecureRequestWarning, action="ignore")
            if data is None:
                response = requests.get(url, **standard_args, **kwargs)
            else:
                response = requests.post(url, data=data, **standard_args, **kwargs)
            return response

    def get_history_data_from_server(self, date: datetime.date):
        data_dir = 'historic'
        filename = f'{self.date_str(date)}_{self.serial_number}_1_historico.csv'
        response = self.api_request(f'{data_dir}/{filename}')
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
        return np.array(timestamps), data

    def _get_register_values(self, first_register: int, number_of_registers: int, type_):
        endpoint = 'recepcion_datos_4.cgi'
        action = 2001 if type_ is bool else 2002
        data = {"idOperacion": action, 'dir': first_register, 'num': number_of_registers}
        response = self.api_request(endpoint, data=data)
        data = response.text
        status, data, null = data.split("\n")
        msg, error_code = status.split("=")
        if type_ is bool:
            assert msg == 'error_geo_get_bit'
        else:
            assert msg == 'error_geo_get_reg'
        assert error_code == '0'
        dir, num, *binary_data = data.split("&")
        assert dir == f'dir={first_register}'
        assert num == f'num={number_of_registers}'
        assert len(binary_data) == number_of_registers
        for i in range(number_of_registers):
            self._register_values[first_register + i] = binary_data[i]

    def _register_value(self, index, type_):
        if index not in self._register_values:
            for page in REGISTER_PAGES:
                first_register, number_of_registers, page_type = page
                if (type_ is page_type
                        and first_register <= index <= first_register + number_of_registers):
                    break
            else:
                first_register = number_of_registers = None
            assert first_register is not None
            self._get_register_values(first_register, number_of_registers, type_)
        return self._register_values[index]

    def _clear_register_cache(self):
        self._register_values = {}

    def get_current_status(self):
        self._clear_register_cache()
        status = {}
        for line in STATUS_DATAPOINTS:
            name, _, type_, index, unit, signed, *_ = line
            if type_ is int:
                index += 5001
            val = int(self._register_value(index, type_), base=16)
            if signed and val > 32768:
                val -= 65536
            if type_ is float:
                val /= 10
            elif type_ is bool:
                val = bool(val)
            status[name] = {'value': val, 'unit': unit}
        return status


# Our name, EF Name, type, register index, 'unit', signed, index in page, dir (first_register), num (num_reg)
STATUS_DATAPOINTS = [['ElectricalPower', 'e_elect', int, 81, 'W', True],
                     ['DHWActualTemp', 'temp_acum_acs', float, 8, 'ºC', True],
                     ['OutsideTemp', 'temp_exterior', float, 11, 'ºC', True],
                     ['HeatingBufferSetpoint', 'set_inercia_heat', float, 215, 'ºC', True],
                     ['HeatingBufferActualTemp', 'temp_dep_heat', float, 200, 'ºC', True],
                     ['HeatingBufferOffset', 'offset_inercia_heat', float, 58, 'ºC', True],
                     ['HeatingOn', 'top_1', bool, 206, '', False],
                     ['HeatingDemand', 'top_1', bool, 249, '', False],
                     ['DHWDemand', 'acs', bool, 208, '', False],
                     ]

# pages of registers used, as extracted from informacion.js
REGISTER_PAGES = [(61, 25, bool), (101, 97, bool,), (206, 62, bool), (5033, 2, int), (5066, 18, int),
                  (5113, 31, int), (5185, 27, int), (5241, 34, int), (5285, 14, int), (1, 39, float),
                  (40, 19, float), (97, 30, float), (176, 29, float), (214, 14, float)]


def date_range(start_date: datetime.date, end_date: datetime.date):
    date = start_date
    while date <= end_date:
        yield date
        date += datetime.timedelta(days=1)


def main():
    year = 2023
    month = 3
    # day = 10
    # datasets = []
    # for day in range(15, 21):
    #     data = DayData(datetime.date(year, month, day))
    #     data.plot()
    #     datasets.append(data)
    with open('site_config.yml') as file:
        config = yaml.safe_load(file)
    config = config['ecoforest']
    client = EcoforestClient(config['server'], config['port'], config['serial-number'], config['auth-key'])
    # client.get_current_status()

    dataset = client.get_history_for_month(year, month)
    # print(dataset.mean_cop())
    # print(dataset.mean_cop(ChunkClass.DHW))
    # print([c.type for c in dataset.chunks()])
    # print([d.mean_cop() for d in dataset.datasets])
    dataset.plot_bar_chart()


if __name__ == '__main__':
    main()
