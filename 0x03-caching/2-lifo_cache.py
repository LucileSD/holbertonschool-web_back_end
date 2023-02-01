#!/usr/bin/env python3
"""
    Basic dictionary
"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
         LIFO caching
    """
    def __init__(self):
        """
            initiate a new array
        """
        super().__init__()
        self.key_order = []

    def put(self, key, item):
        """
            assign the item to the dictinary key or delete a key
            args:
                key: the key of the dictionary
                item: the value of the key
        """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.cache_data[key] = item
            elif len(self.cache_data) >= self.MAX_ITEMS:
                discard_key = self.key_order.pop(-1)
                self.cache_data.pop(discard_key)
                print("DISCARD: {}".format(discard_key))
            self.cache_data[key] = item
            self.key_order.append(key)

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
