#!/usr/bin/env python3
"""Module session expiration"""

from api.v1.auth.session_auth import SessionAuth
import datetime
import os
from datetime import timedelta, datetime


class SessionExpAuth(SessionAuth):
    """class session expiration"""
    def __init__(self):
        """initiation"""
        session_duration = int(os.getenv('SESSION_DURATION'))
        try:
            session_duration = int(session_duration)
        except Exception:
            session_duration = 0

        self.session_duration = session_duration

    def create_session(self, user_id=None):
        """create a session"""
        try:
            session = super().create_session(user_id)
        except Exception:
            return None

        self.user_id_by_session_id[session] = {
            'user_id': user_id,
            'created_at': datetime.now()
        }
        return session

    def user_id_for_session_id(self, session_id=None):
        """retrieve a link between a User ID and a Session ID."""
        if session_id is None:
            return None
        if session_id not in self.user_id_by_session_id.keys():
            return None
        session = self.user_id_by_session_id.get(session_id)
        if self.session_duration <= 0:
            return session['user_id']
        created_at = session['created_at']
        if not created_at:
            return None
        expire = created_at + timedelta(seconds=self.session_duration)
        if expire < datetime.now():
            return None
        return session['user_id']
