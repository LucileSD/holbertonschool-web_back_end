#!/usr/bin/env python3
"""
     Let's execute multiple coroutines at the same time with async
"""

from typing import List
import asyncio

task_wait_random = __import__('3-tasks').wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
        multiple coroutines at the same time with async
        args:
            n: the number of times that wait random is spawned
            max_delay: the delay maximum
        return: a list of delay
    """
    delays = []
    tasks = []
    for i in range(n):
        tasks.append(asyncio.create_task(task_wait_random(max_delay)))
    for task in asyncio.as_completed(tasks):
        delays.append(await task)
    return delays
