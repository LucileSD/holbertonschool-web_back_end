#!/usr/bin/env python3
"""
    Complex types - mixed list
"""
from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """
        sum of elements in a list
        args:
            mxd_lst: the list
        return the sum
    """
    return sum(mxd_lst)
