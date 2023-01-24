#!/usr/bin/env python3
"""
    Tasks
"""

from asyncio import Task
import asyncio
from typing import Any, AsyncGenerator

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> Task:
    """
        create task
        args:
            max_delay: maximum delay
        return asyncio.Task
    """
    return asyncio.create_task(wait_random(max_delay))
