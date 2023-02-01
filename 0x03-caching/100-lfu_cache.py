#!/usr/bin/env python3
"""
    Basic dictionary
"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
        LRU Caching
    """
    def __init__(self):
        """
            initiate a new array
        """
        super().__init__()
        self.frequency_data = {}

    def put(self, key, item):
        """
            assign the item to the dictinary key or delete a key
            args:
                key: the key of the dictionary
                item: the value of the key
        """
        if key is not None or item is not None:
            if key in self.cache_data:
                self.cache_data[key] = item
                self.frequency_data[key] += 1
            else:
                self.cache_data[key] = item
                self.frequency_data[key] = 0
            if len(self.cache_data) > self.MAX_ITEMS:
                least_frequent_key = self.frequency_data.popitem()
                index = min(self.frequency_data, key=self.frequency_data.get)
                self.frequency_data.pop(index)
                self.frequency_data[least_frequent_key[0]] = least_frequent_key[1]
                print("DISCARD: {}".format(index))
                self.cache_data.pop(index)

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
        self.frequency_data[key] += 1
        return self.cache_data[key]
