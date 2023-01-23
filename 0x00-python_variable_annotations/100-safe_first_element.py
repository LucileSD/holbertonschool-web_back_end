#!/usr/bin/env python3
"""
    Duck typing - first element of a sequence
"""
from typing import Any, Sequence, Union


def safe_first_element(lst: Sequence[Any]) -> Union[Any, None]:
    """
        find the firs element of a list
        args:
            lst: the list of elements
        return: the first element
    """
    if lst:
        return lst[0]
    else:
        return None
