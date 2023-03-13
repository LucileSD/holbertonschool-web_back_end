#!/usr/bin/env python3
"""module to change topics"""

from pymongo.collection import Collection
from typing import List


def update_topics(mongo_collection: Collection, name: str, topics: List):
    """changes all topics of a school document based on the name"""
    mongo_collection.update_one({'name': name}, {'$set': {'topics': topics}})
