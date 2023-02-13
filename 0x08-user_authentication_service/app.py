#!/usr/bin/env python3
"""app module"""

from flask import abort, Flask, jsonify, request
from auth import Auth


app = Flask(__name__)


AUTH = Auth()


@app.route("/", methods=["GET"])
def index():
    """ return a JSON payload of the form"""
    return jsonify({"message": "Bienvenue"}), 200


@app.route("/users", methods=["POST"])
def users():
    """ the end-point to register a user"""
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = AUTH.register_user(email, password)
        return jsonify({"email": user.email, "message": "user created"}), 200
    except Exception:
        return jsonify({"message": "email already registered"}), 400


@app.route("/sessions", methods=["POST"])
def login():
    """store the session_id as a cookie"""
    email = request.form.get('email')
    password = request.form.get('password')
    if AUTH.valid_login(email, password) is False:
        abort(401)
    else:
        session = AUTH.create_session(email)
        response = jsonify({"email": email, "message": "logged in"})
        response.set_cookie("session_id", session)
        return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port='5000')
