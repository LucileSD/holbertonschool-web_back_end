#!/usr/bin/env python3
"""Writing strings to Redis"""

import redis
from typing import Callable, Optional, Union
import uuid


class Cache():
    """class Cache"""
    def __init__(self) -> None:
        """initialization"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    def store(self, data: Union[str, bytes, int, float]) -> str:
        """keep the data in a random key"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable]) ->\
            Union[str, bytes, int, float]:
        """convert the data back to the desired format"""
        if fn:
            data = self._redis.get(key)
            return fn(data)
        return self._redis.get(key)

    def get_str(self, key: str) -> str:
        """parametrize Cache.get with the correct conversion function"""
        return self.get(key, str)

    def get_int(self, key: str) -> int:
        """parametrize Cache.get with the correct conversion function"""
        return self.get(key, int)
