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
    def count(url):
        r.incr(f"count:{url}")
        cached_response = r.get(f"cached:{url}")
        if cached_response:
            return cached_response.decode('utf-8')
        r.setex(f"cached:{url}", 10, method(url))
        return method(url)
    return count


@get_page_count
def get_page(url: str) -> str:
    content = requests.get(url)
    return content.text
