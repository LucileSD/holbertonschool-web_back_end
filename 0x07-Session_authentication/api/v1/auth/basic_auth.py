#!/usr/bin/env python3
"""module basic authentification"""

from api.v1.auth.auth import Auth
import base64
import binascii
from typing import TypeVar, Tuple
from models.base import Base
from models.user import User


class BasicAuth(Auth):
    """module basic authentification"""
    def extract_base64_authorization_header(self,
                                            authorization_header: str) -> str:
        """extract authorization header"""
        if authorization_header is None:
            return None
        if type(authorization_header) is not str:
            return None
        if not authorization_header.startswith("Basic "):
            return None
        return authorization_header.split("Basic ")[1]

    def decode_base64_authorization_header(self,
                                           base64_authorization_header:
                                           str) -> str:
        """decode the authorization header"""
        if base64_authorization_header is None:
            return None
        if type(base64_authorization_header) is not str:
            return None
        try:
            decoded = base64.b64decode(base64_authorization_header)
            return decoded.decode('utf-8')
        except (binascii.Error, UnicodeDecodeError):
            return None

    def extract_user_credentials(self, decoded_base64_authorization_header:
                                 str) -> Tuple[str]:
        """extract the user email and password from the Base64 decoded value"""
        if decoded_base64_authorization_header is None:
            return None, None
        if type(decoded_base64_authorization_header) is not str:
            return None, None
        if ":" not in decoded_base64_authorization_header:
            return None, None
        index = decoded_base64_authorization_header.index(":")
        email = decoded_base64_authorization_header[:index]
        password = decoded_base64_authorization_header[index+1:]
        return email, password

    def user_object_from_credentials(self, user_email: str, user_pwd:
                                     str) -> TypeVar('User'):
        """ the User instance based on his email and password"""
        if user_email is None or type(user_email) is not str:
            return None
        if user_pwd is None or type(user_pwd) is not str:
            return None
        try:
            users = User.search({'email': user_email})
        except Exception:
            return None
        for user in users:
            if user.is_valid_password(user_pwd):
                return user
        return None

    def current_user(self, request=None) -> TypeVar('User'):
        """retrive all information of the user"""
        header = self.authorization_header(request)
        if header is None:
            return None
        extract_base64 = self.extract_base64_authorization_header(header)
        if extract_base64 is None:
            return None
        decoded = self.decode_base64_authorization_header(extract_base64)
        if decoded is None:
            return None
        extract_user = self.extract_user_credentials(decoded)
        if extract_user is None:
            return None
        return self.user_object_from_credentials(*extract_user)
