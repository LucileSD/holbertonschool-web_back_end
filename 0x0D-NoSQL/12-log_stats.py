#!/usr/bin/env python3
""" provides some stats about Nginx logs stored in MongoDB"""
from pymongo import MongoClient


client = MongoClient()
collection = client.logs.nginx

count = collection.count_documents({})

print("{} logs".format(count))

count_get = collection.count_documents({"method": "GET"})
count_post = collection.count_documents({"method": "POST"})
count_put = collection.count_documents({"method": "PUT"})
count_patch = collection.count_documents({"method": "PATCH"})
count_del = collection.count_documents({"method": "DELETE"})

print("Methods:")
print("    method GET: {}".format(count_get))
print("    method POST: {}".format(count_post))
print("    method PUT: {}".format(count_put))
print("    method PATCH: {}".format(count_patch))
print("    method DELETE: {}".format(count_del))

count_status = collection.count_documents({"method": "GET", "path": "/status"})
print("{} status check".format(count_status))
