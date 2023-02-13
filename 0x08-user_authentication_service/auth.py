#!/usr/bin/env python3
"""auth module
"""

import bcrypt
from db import DB
from user import User
import uuid
from sqlalchemy.orm.exc import NoResultFound


def _hash_password(password: str) -> bytes:
    """method to hash a password"""
    pwd = password.encode('utf-8')
    hashed = bcrypt.hashpw(pwd, bcrypt.gensalt())
    return hashed


class Auth:
    """Auth class to interact with the authentication database.
    """

    def __init__(self):
        self._db = DB()

    def register_user(self, email: str, password: str) -> User:
        """add a user in the database"""
        try:
            user = self._db.find_user_by(email=email)
        except NoResultFound:
            user = self._db.add_user(email, _hash_password(password))
            return user
        raise ValueError("User {} already exists".format(user.email))

    def valid_login(self, email, password) -> bool:
        """check if password match with the hashed password"""
        try:
            user = self._db.find_user_by(email=email)
        except NoResultFound:
            return False
        pwd = password.encode('utf-8')
        return bcrypt.checkpw(pwd, user.hashed_password)

    def _generate_uuid(self) -> str:
        """generate a unique id"""
        return str(uuid.uuid4())

    def create_session(self, email: str) -> str:
        """generate a new UUID and store it in the database as the user’s
           session_id"""
        try:
            user = self._db.find_user_by(email=email)
        except NoResultFound:
            return None
        new = self._db._session.query(User).filter_by(email=email).first()
        new.session_id = self._generate_uuid()
        self._db._session.commit()
        return user.session_id
