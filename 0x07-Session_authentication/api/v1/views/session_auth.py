#!/usr/bin/env python3
""" Module of Session views
"""
from api.v1.views import app_views
from flask import abort, jsonify, request, session, make_response
from models.user import User
import os


@app_views.route('/auth_session/login', methods=['POST'], strict_slashes=False)
def login():
    """an authentication based on a Session ID stored in cookie"""
    email = request.form.get('email')
    if not email:
        return jsonify({"error": "email missing"}), 400
    password = request.form.get('password')
    if not password:
        return jsonify({"error": "password missing"}), 400
    user = User.search({'email': email})
    if not user:
        return jsonify({"error": "no user found for this email"}), 404
    user = user[0]
    if not user.is_valid_password(password):
        return jsonify({"error": "wrong password"}), 401
    from api.v1.app import auth
    session_id = auth.create_session(user.id)
    usr = jsonify(user.to_json())
    usr.set_cookie(os.getenv("SESSION_NAME"), session_id)
    return usr


@app_views.route('/auth_session/logout',
                 methods=['DELETE'], strict_slashes=False)
def destroy_user():
    """deleting the Session ID contains in the request as cookie"""
    from api.v1.app import auth
    if auth.destroy_session(request):
        return jsonify({}), 200
    return abort(404)
