#!/usr/bin/env python3
"""module to list documents"""

from pymongo.collection import Collection
from typing import List


def list_all(mongo_collection: Collection) -> List:
    """list all documents in a collection"""
    if mongo_collection:
        return mongo_collection.find()
    return []
