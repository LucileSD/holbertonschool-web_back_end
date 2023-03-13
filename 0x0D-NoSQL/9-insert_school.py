#!/usr/bin/env python3
"""module to insert in a document"""

from pymongo.collection import Collection


def insert_school(mongo_collection: Collection, **kwargs):
    """insert a new document in the collection based on kwargs"""
    return mongo_collection.insert_one({**kwargs}).inserted_id
