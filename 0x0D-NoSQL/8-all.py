#!/usr/bin/env python3
"""module to list documents"""

from pymongo.collection import Collection
from typing import List

if __name__ == "__main__":

    def list_all(mongo_collection: Collection) -> List:
        """list all documents in a collection"""
        return list(mongo_collection.find())
