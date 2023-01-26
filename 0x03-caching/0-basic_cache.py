#!/usr/bin/env python3
"""
    Basic dictionary
"""

from base_caching import BaseCaching


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
        if key is None or key not in self.cache_data:
            return None
        else:
            return self.cache_data[key]
