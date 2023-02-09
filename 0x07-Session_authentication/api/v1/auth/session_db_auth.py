#!/usr/bin/env python3
"""Module session db"""

from api.v1.auth.session_exp_auth import SessionExpAuth
from models.user_session import UserSession


class SessionDBAuth(SessionExpAuth):
    """class to store session in a db"""
    def create_session(self, user_id=None):
        """create a session based on user_id"""
        session_id = self.create_session(user_id)
        if session_id:
            session = UserSession(user_id=user_id,
                                  session_id=session_id)
        if session:
            session.save()
            UserSession.save_to_file()
            return session_id

    def user_id_for_session_id(self, session_id=None):
        """retrieve a link between a User ID and a Session ID."""
        if session_id is None:
            return None
        UserSession.load_from_file()
        session = UserSession.search({"session_id": session_id})
        user = session[0]
        return user.user_id

    def destroy_session(self, request=None):
        """destroy a session"""
        if request:
            session_id = self.session_cookie(request)
            if session_id:
                if self.user_id_for_session_id(session_id):
                    del self.user_id_by_session_id[session_id]
                    UserSession.save_to_file()
                    return True
        return False
