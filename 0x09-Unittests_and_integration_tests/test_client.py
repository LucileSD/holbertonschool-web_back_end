#!/usr/bin/env python3
"""module to test client.py"""
import unittest
from unittest.mock import patch, PropertyMock
from parameterized import parameterized
from client import GithubOrgClient


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
        """test public_repos"""
        patched = "client.GithubOrgClient.org"
        expected = "https://api.github.com/orgs/google/repos"
        payload = {"repos_url": expected}
        with patch(patched, PropertyMock(return_value=payload)):
            obj = GithubOrgClient("google")
            self.assertEqual(obj._public_repos_url, expected)

    @patch("client.get_json", return_value={})
    def test_public_repo(self, patched):
        """test public_repos"""
        with patch("client.GithubOrgClient._public_repos_url",
                   new_callable=PropertyMock, return_value=[]) as mc:
            obj = GithubOrgClient("google")
            response = obj.public_repos(license="string")
            self.assertEqual(response, mc.return_value)
            patched.assert_called_once()
            mc.assert_called_once()
