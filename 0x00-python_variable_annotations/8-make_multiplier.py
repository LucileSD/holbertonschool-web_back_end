#!/usr/bin/env python3
"""
    Complex types - functions
"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
        function to multiply
        args:
            multiplier: the multiplier
        return the result
    """
    def multiply_by_multiplier(x: float) -> float:
        """
            multiply the two numbers
            args:
                x: the number
        """
        return x * multiplier
    return multiply_by_multiplier
