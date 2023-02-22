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
        ("abc"),
    ])
    @patch("client.get_json", return_value={})
    def test_org(self, org, patched_get_json):
        """test org()"""
        client = GithubOrgClient(org)
        self.assertEqual(client.org, patched_get_json.return_value)
        patched_get_json.assert_called_once()

    def test_public_repos_url(self):
        """test public_repos()"""
        org = "google"
        patched = "client.GithubOrgClient.org"
        expected = "https://api.github.com/orgs/google/repos"
        payload = {"repos_url": expected}
        with patch(patched, PropertyMock(return_value=payload)):
            obj = GithubOrgClient(org)
            self.assertEqual(obj._public_repos_url, expected)
