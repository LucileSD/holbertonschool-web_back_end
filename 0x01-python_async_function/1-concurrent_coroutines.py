#!/usr/bin/env python3
"""
     Let's execute multiple coroutines at the same time with async
"""

from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
        multiple coroutines at the same time with async
        args:
            n: the number of times that wait random is spawned
            max_delay: the delay maximum
        return: a list of delay
    """
    random_list: List[float] = []
    for times in range(0, n):
        random_list.append(await wait_random(max_delay))
        random_list.sort()
    return random_list
