#!/usr/bin/env python3
"""module to list documents"""


def list_all(mongo_collection):
    """list all documents in a collection"""
    return mongo_collection.find()
