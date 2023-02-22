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
        """test org"""
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
    def test_public_repos(self, patched):
        """test public_repos"""
        with patch("client.GithubOrgClient._public_repos_url",
                   new_callable=PropertyMock, return_value=[]) as mc:
            obj = GithubOrgClient("google")
            result = obj.public_repos(license="f")
            self.assertEqual(result, mc.return_value)
            patched.assert_called_once()
            mc.assert_called_once()

    @parameterized.expand([
        ({"license": {"key": "my_license"}}, "my_license", True),
        ({"license": {"key": "other_license"}}, "my_license", False),
    ])
    def test_has_license(self, repo, license_key, expected):
        """Test has_license"""
        obj = GithubOrgClient("try")
        self.assertEqual(obj.has_license(repo, license_key), expected)


@parameterized_class(("org_payload", "repos_payload",
                      "expected_repos", "apache2_repos", ), TEST_PAYLOAD)
class TestIntegrationGithubOrgClient(unittest.TestCase):
    """class test integration"""
    @classmethod
    def setUpClass(cls):
        """open integration test"""
        requests_json = unittest.mock.Mock()
        requests_json.json.side_effect = [
            cls.org_payload, cls.repos_payload,
            cls.org_payload, cls.repos_payload,
        ]
        cls.get_patcher = patch('requests.get', return_value=requests_json)
        cls.mock_get = cls.get_patcher.start()

    def test_public_repos(self):
        """test public_repos"""
        obj = GithubOrgClient("google")
        self.assertEqual(obj.public_repos(), self.expected_repos)

    def test_public_repos_with_license(self):
        """test license"""
        obj = GithubOrgClient("google")
        self.assertEqual(obj.public_repos("apache-2.0"), self.apache2_repos)

    @classmethod
    def tearDownClass(cls):
        """close integration test"""
        cls.get_patcher.stop()
