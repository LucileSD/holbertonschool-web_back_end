#!/usr/bin/env python3
"""just a little module to get page"""

from functools import wraps
import requests
import redis
from typing import Callable


r = redis.Redis()


def get_page_count(method: Callable) -> Callable:
    """obtain the HTML content of a particular URL"""
    @wraps(method)
    def count(*args):
        r.incr(method)
        r.expire(method, 10)
        return method(*args)
    return count


@get_page_count
def get_page(url: str) -> str:
    content = requests.get(url)
    return content
