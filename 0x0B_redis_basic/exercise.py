#!/usr/bin/env python3
"""Writing strings to Redis"""

from functools import wraps
import redis
from typing import Callable, Optional, Union
import uuid


def count_calls(method: Callable) -> Callable:
    """define a decorator"""
    @wraps(method)
    def count_wrapper(self, *args, **kwargs) -> bytes:
        """increment by 1 every time the method is called"""
        self._redis.incr(method.__qualname__)
        return method(self, *args, **kwargs)
    return count_wrapper


def call_history(method: Callable) -> Callable:
    """define a decorator"""
    inputs = "{}:inputs".format(method.__qualname__)
    outputs = "{}:outputs".format(method.__qualname__)

    @wraps(method)
    def history_wrapper(self, *args, **kwds) -> bytes:
        """store the history of inputs and outputs for a particular function"""
        self._redis.rpush(inputs, str(args))
        output = method(self, *args, **kwds)
        self._redis.rpush(outputs, output)
        return output
    return history_wrapper


def replay(method: Callable) -> None:
    """display the history of calls of a particular function"""
    key = method.__qualname__
    inputs = f"{key}:inputs"
    outputs = f"{key}:outputs"

    r = redis.Redis()

    nb_calls = r.get(key).decode("utf-8")
    list_input = r.lrange(inputs, 0, -1)
    list_ouput = r.lrange(outputs, 0, -1)
    """count = len(list_input) instead of nb_calls"""

    print(f"{key} was called {nb_calls} times:")

    for enter, out in zip(list_input, list_ouput):
        inner = enter.decode("utf-8")
        outter = out.decode("utf-8")
        print(f"{key}(*{inner}) -> {outter}")


class Cache():
    """class Cache"""
    def __init__(self) -> None:
        """initialization"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    @call_history
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """keep the data in a random key"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable] = None) ->\
            Union[str, bytes, int, float]:
        """convert the data back to the desired format"""
        if fn:
            data = self._redis.get(key)
            return fn(data)
        return self._redis.get(key)

    def get_str(self, data: str) -> str:
        """parametrize Cache.get with the correct conversion function"""
        return data.decode('utf-8')

    def get_int(self, data: str) -> int:
        """parametrize Cache.get with the correct conversion function"""
        return int(data)
