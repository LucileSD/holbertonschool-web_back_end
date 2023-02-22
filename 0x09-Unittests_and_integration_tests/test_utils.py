#!/usr/bin/env python3
"""module of test for utils.py"""

import unittest
from unittest import mock
from parameterized import parameterized
from utils import access_nested_map, get_json, memoize
from unittest.mock import Mock, patch


class TestAccessNestedMap(unittest.TestCase):
    """test nested map"""
    @parameterized.expand([
        ({"a": 1}, ["a"], 1),
        ({"a": {"b": 2}}, ["a"], {"b": 2}),
        ({"a": {"b": 2}}, ["a", "b"], 2),
    ])
    def test_access_nested_map(self, nested_map, path, expected):
        """test method access_nested_map()"""
        self.assertEqual(access_nested_map(nested_map, path), expected)

    @parameterized.expand([
        ({}, ("a", ), "a"),
        ({"a": 1}, ("a", "b"), 1)
    ])
    def test_access_nested_map_exception(self, nested_map, path, expected):
        """test error for access_nested_map()"""
        with self.assertRaises(KeyError) as raises:
            access_nested_map(nested_map, path)
            self.assertEqual(raises.exception, expected)
