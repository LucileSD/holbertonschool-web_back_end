#!/usr/bin/env python3
"""
    Basic dictionary
"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
        MRU Caching
    """
    def __init__(self):
        """
            initiate a new array
        """
        super().__init__()
        self.recently_used = []

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
                self.recently_used.remove(key)
            elif len(self.cache_data) >= self.MAX_ITEMS:
                discard_key = self.recently_used.pop(-1)
                del self.cache_data[discard_key]
                print("DISCARD: {}".format(discard_key))
            self.cache_data[key] = item
            self.recently_used.append(key)

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
            self.recently_used.remove(key)
            self.recently_used.append(key)
            return self.cache_data[key]
