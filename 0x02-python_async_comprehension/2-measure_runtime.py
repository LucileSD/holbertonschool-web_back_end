#!/usr/bin/env python3
"""
    Run time for four parallel comprehensions
"""

import asyncio
import time
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
        measure the total runtime and return it
    """
    startTime = time.time()
    for i in range(4):
        await asyncio.gather(*[async_comprehension() for i in range(4)])
    endtime = time.time()
    return endtime - startTime
