#!/usr/bin/env python3
"""module to test client.py"""
import unittest
from unittest.mock import patch, PropertyMock
from parameterized import parameterized, parameterized_class
from client import GithubOrgClient
from fixtures import TEST_PAYLOAD


class TestGithubOrgClient(unittest.TestCase):
    """unittest client.py"""
    @parameterized.expand([
        ("google"),
        ("abc")
    ])
    @patch("client.get_json", return_value={})
    def test_org(self, org, patched_get_json):
        """test org()"""
        client = GithubOrgClient(org)
        self.assertEqual(client.org, patched_get_json.return_value)
        patched_get_json.assert_called_once()
