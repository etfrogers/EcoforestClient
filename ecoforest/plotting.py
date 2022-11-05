import datetime
from typing import Sequence, Union, AnyStr, Dict

import numpy as np
from matplotlib import pyplot as plt


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
