#!/usr/bin/env python3
"""
    Regex-ing
"""

import re
from typing import List
import logging


class RedactingFormatter(logging.Formatter):
    """ Redacting Formatter class
        """

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields):
        """
            initiate
        """
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields

    def format(self, record: logging.LogRecord) -> str:
        """
            filter values in incoming log records
        """
        record.msg = filter_datum(self.fields, self.REDACTION, record.msg,
                                  self.SEPARATOR)
        return super().format(record)


def filter_datum(fields: List[str],
                 redaction: str, message: str, separator: str) -> str:
    """
        obfuscated some fields in the message
    """
    for field in fields:
        message = re.sub(field + '=.+?' + separator, field + '=' +
                         redaction + separator, message)
    return message
