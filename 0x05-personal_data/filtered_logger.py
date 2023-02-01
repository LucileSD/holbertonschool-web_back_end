#!/usr/bin/env python3
"""
    Regex-ing
"""

import re
from typing import List


def filter_datum(fields: List[str],
                 redaction: str, message: str, separator: str) -> str:
    """
        obfuscated some fields in the message
    """
    for field in fields:
        message = re.sub(field + '=.+?' + separator, field + '=' +
                         redaction + separator, message)
    return message
