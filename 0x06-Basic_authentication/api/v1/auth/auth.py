#!/usr/bin/env python3
"""authentification class"""


from flask import request
from typing import List, TypeVar


class Auth:
    """class authentification"""
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """ask authentification"""
        if path is None:
            return True
        if excluded_paths is None or len(excluded_paths) == 0:
            return True
        for excluded in excluded_paths:
            if excluded.startswith(path) or excluded == path:
                return False
            if excluded.endswith("*") and path.startswith(excluded[:-1]):
                return False
        return True

    def authorization_header(self, request=None) -> str:
        """authorization header"""
        if request is None:
            return None
        if 'Authorization' not in request.headers:
            return None
        return request.headers['Authorization']

    def current_user(self, request=None) -> TypeVar('User'):
        """current user"""
        return None
