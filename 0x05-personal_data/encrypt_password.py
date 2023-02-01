#!/usr/bin/env python3
"""
    Encrypting passwords
"""

import bcrypt


def hash_password(password: str) -> str:
    """
        Encrypting passwords
    """
    pwd = password.encode('utf-8')
    hashed = bcrypt.hashpw(pwd, bcrypt.gensalt())
    return hashed
