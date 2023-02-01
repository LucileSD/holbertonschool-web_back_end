#!/usr/bin/env python3
"""
    Encrypting passwords
"""

import bcrypt


def hash_password(password: str) -> bytes:
    """
        Encrypting passwords
    """
    pwd = password.encode('utf-8')
    hashed = bcrypt.hashpw(pwd, bcrypt.gensalt())
    return hashed


def is_valid(hashed_password: bytes, password: str) -> bool:
    """
        Check valid password
    """
    pwd = password.encode('utf-8')
    if bcrypt.checkpw(pwd, hashed_password):
        return True
    else:
        return False
