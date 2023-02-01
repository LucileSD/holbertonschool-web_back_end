#!/usr/bin/env python3
"""
    Basic dictionary
"""

from base_caching import BaseCaching
import sys


class BasicCache(BaseCaching):
    """
        basic cache
    """
    def put(self, key, item):
        """
            assign the item to the dictinary key
            args:
                key: the key of the dictionary
                item: the value of the key
        """
        if key is not None or item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
            get the value of a key
            args:
                key: the key in the dictionary
            return:
                the value of the key or none
        """
        if key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
