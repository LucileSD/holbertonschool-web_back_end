#!/usr/bin/env python3
""" provides some stats about Nginx logs stored in MongoDB"""
from pymongo import MongoClient


if __name__ == "__main__":
    client = MongoClient()
    collection = client.logs.nginx

    count = collection.count_documents({})

    print("{} logs".format(count))
    print("Methods:")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        print("\tmethod {}: {}".format(method,
                                         collection.count_documents
                                         ({"method": method})))

    count_status = collection.count_documents({"method": "GET",
                                               "path": "/status"})
    print("{} status check".format(count_status))
