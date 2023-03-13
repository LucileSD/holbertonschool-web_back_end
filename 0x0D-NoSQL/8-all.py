#!/usr/bin/env python3
"""module to list documents"""

from pymongo.collection import Collection


def list_all(mongo_collection: Collection):
    """list all documents in a collection"""
    list = []
    list = mongo_collection.find()
    return list
