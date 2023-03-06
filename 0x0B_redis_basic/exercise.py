#!/usr/bin/env python3
"""Writing strings to Redis"""

import redis
from typing import Any
import uuid


class Cache():
    """class Cache"""
    def __init__(self) -> None:
        """initialization"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    def store(self, data: Any) -> str:
        """keep the data in a random key"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key
