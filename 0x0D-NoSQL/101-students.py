#!/usr/bin/env python3
"""Top students"""

from pymongo.collection import Collection
import pymongo


def top_students(mongo_collection: Collection):
    """make an average for each students of their score
       and sorted them by average score"""
    class_students = mongo_collection.find()

    for student in class_students:
        courses = student.get('topics')
        total_score = 0
        count = 0
        averageScore = 0
        for course in courses:
            total_score += course.get('score')
            count += 1
        averageScore = total_score / count
        mongo_collection.update_one({"name": student.get('name')},
                                    {"$set": {'averageScore': averageScore}})

    return mongo_collection.find().sort('averageScore', pymongo.DESCENDING)
