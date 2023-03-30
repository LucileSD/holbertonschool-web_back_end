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


class TestGetJson(unittest.TestCase):
    """test get json"""
    @parameterized.expand([
            ("http://example.com", {"payload": True}),
            ("http://holberton.io", {"payload": False})
    ])
    def test_get_json(self, test_url, test_payload):
        """test method get json()"""
        with patch("requests.get") as mc:
            mc.return_value.json.return_value = test_payload
            """ json.return_value, met le retour en format json"""
            self.assertEqual(get_json(test_url), test_payload)
            mc.assert_called_once()


class TestMemoize(unittest.TestCase):
    """test cache"""
    def test_memoize(self):
        """test cache"""
        class TestClass:

            def a_method(self):
                return 42

            @memoize
            def a_property(self):
                return self.a_method()

        with patch.object(TestClass, "a_method", return_value=42) as moc_meth:
            obj = TestClass()
            self.assertEqual(obj.a_property, moc_meth.return_value)
            """a_property is call twice with TestCalss() and obj.a_property """
            moc_meth.assert_called_once()
