#!/usr/bin/env python3
"""module application"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)


class Config():
    """configuration language"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)
babel.init_app(app)


@app.route('/')
def hello():
    """print hello world"""
    title = "Welcome to Holberton"
    h1 = "Hello world"
    return render_template("1-index.html", title=title, hello=h1)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
