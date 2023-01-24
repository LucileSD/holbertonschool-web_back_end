#!/usr/bin/env python3
"""
    Measure the runtime
"""

import asyncio
import time

wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
        measures the total execution time for wait_n(n, max_delay)
        args:
            n: the number of times that wait random is spawned
            max_delay: the delay maximum
        return the time
    """
    startTime = time.time()
    asyncio.run(wait_n(n, max_delay))
    endtime = time.time()
    total_time = endtime - startTime
    return (total_time / n)
