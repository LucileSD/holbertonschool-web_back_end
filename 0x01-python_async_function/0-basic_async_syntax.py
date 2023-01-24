#!/usr/bin/env python3
"""
    The basics of async
"""

import asyncio
import random
from typing import Optional


async def wait_random(max_delay: int = 10) -> float:
    """
        asynchronous coroutine
        args:
            max_delay: the maximum delay to wait
        return a dalay
    """
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
