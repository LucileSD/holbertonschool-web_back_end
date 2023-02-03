#!/usr/bin/env python3
"""
    Logging
"""

import re
from typing import List
import logging
import os
import mysql.connector


PII_FIELDS = ("name", "email", "phone", "ssn", "password")


class RedactingFormatter(logging.Formatter):
    """ Redacting Formatter class
        """

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields: List[str]):
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


def get_logger() -> logging.Logger:
    """
        Create logger
    """
    logger = logging.getLogger()
    logger.name = "user_data"
    logger.setLevel(logging.INFO)
    logger.propagate = False
    handler = logging.StreamHandler()
    formatter = RedactingFormatter(fields=PII_FIELDS)
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


def get_db() -> mysql.connector.connection.MySQLConnection:
    """
        Connect to secure database
    """
    db_user = os.getenv("PERSONAL_DATA_DB_USERNAME", "root")
    db_password = os.getenv("PERSONAL_DATA_DB_PASSWORD", "")
    db_host = os.getenv("PERSONAL_DATA_DB_HOST", "localhost")
    db_name = os.environ["PERSONAL_DATA_DB_NAME"]
    return mysql.connector.connect(user=db_user,
                                   password=db_password,
                                   host=db_host,
                                   database=db_name)


def main() -> None:
    """
        Read and filter data
    """
    logger = get_logger()
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    for row in cursor.fetchall():
        logger.info("name={}; email={}; phone={}; ssn={}; password={};\
 ip={}; last_login={}; user_agent={}".format(row[0], row[1], row[2], row[3],
                                             row[4], row[5], row[6], row[7]))
    cursor.close()
    db.close()


if __name__ == '__main__':
    main()
