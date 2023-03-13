#!/usr/bin/env python3
"""find a specific topic"""

from pymongo.collection import Collection


def schools_by_topic(mongo_collection: Collection, topic: str):
    """find in the collection all the document with the specific topic"""
    return mongo_collection.find({'topics': topic})
