#!/usr/bin/env python3
"""
Main file
"""
import requests


def register_user(email: str, password: str) -> None:
    """"""
    data={"email": email, "password": password}
    response = requests.post("http://localhost:5000/users",
                             data=data)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"


def log_in_wrong_password(email: str, password: str) -> None:
    data = {"email": email, "password": password}
    response = requests.post("http://localhost:5000/sessions", data=data)
    assert response.status_code == 401, f"Expected status code 401, got {response.status_code}"

def log_in(email: str, password: str) -> str:
    data = {"email": email, "password": password}
    response = requests.post("http://localhost:5000/sessions", data=data)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
    return response.cookies.get("session_id")

def profile_unlogged() -> None:
    response = requests.get("http://localhost:5000/profile")
    assert response.status_code == 403, f"Expected status code 403, got {response.status_code}"

def profile_logged(session_id: str) -> None:
    headers = {"session_id": session_id}
    response = requests.get("http://localhost:5000/profile", cookies=headers)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

def log_out(session_id: str) -> None:
    headers = {"session_id": session_id}
    response = requests.delete("http://localhost:5000/sessions", cookies=headers)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

def reset_password_token(email: str) -> str:
    data = {"email": email}
    response = requests.post("http://localhost:5000/reset_password", data=data)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
    return response.json()["reset_token"]

def update_password(email: str, reset_token: str, new_password: str) -> None:
    data = {"email": email, "reset_token": reset_token, "new_password": new_password}
    response = requests.put("http://localhost:5000/reset_password", data=data)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

EMAIL = "guillaume@holberton.io"
PASSWD = "b4l0u"
NEW_PASSWD = "t4rt1fl3tt3"


if __name__ == "__main__":

    register_user(EMAIL, PASSWD)
    log_in_wrong_password(EMAIL, NEW_PASSWD)
    profile_unlogged()
    session_id = log_in(EMAIL, PASSWD)
    profile_logged(session_id)
    log_out(session_id)
    reset_token = reset_password_token(EMAIL)
    update_password(EMAIL, reset_token, NEW_PASSWD)
    log_in(EMAIL, NEW_PASSWD)

