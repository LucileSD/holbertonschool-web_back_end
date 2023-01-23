#!/usr/bin/env python3
"""
    Let's duck type an iterable object
"""
from typing import Iterable, List, Tuple, Sequence


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
        lenght of an element
        args:
            lst: the list of elements
        return: a tuple
    """
    return [(i, len(i)) for i in lst]
