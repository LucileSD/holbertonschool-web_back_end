#!/usr/bin/env python3
"""find a specific topic"""


def schools_by_topic(mongo_collection, topic):
    """find in the collection all the document with the specific topic"""
    return mongo_collection.find({'topics': topic})
