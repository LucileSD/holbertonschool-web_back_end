#!/usr/bin/env python3
"""
    More involved type annotations
"""
from typing import Any, Mapping, TypeVar, Union

T = TypeVar('T')


def safely_get_value(dct: Mapping, key: Any,
                     default: Union[T, None] = None) -> Union[Any, T]:
    """
        find the value associated to a key
        args:
            dct: a mapping
            key: the key
            default: if the key doesn't exist
        return the value of the key or the default value
    """
    if key in dct:
        return dct[key]
    else:
        return default
