#!/usr/bin/env python3
"""
    Type Checking
"""
from typing import List, Tuple


def zoom_array(lst: Tuple, factor: int = 2) -> List:
    """
        look in an array
        args:
            lst: tuple of elements
            factor: default value 2
        return: a list containing factor number of times each item
                in the input tuple.
    """
    zoomed_in: List = [
        item for item in lst
        for i in range(factor)
    ]
    return zoomed_in


array = [12, 72, 91]

zoom_2x = zoom_array(tuple(array))

zoom_3x = zoom_array(tuple(array), 3)
