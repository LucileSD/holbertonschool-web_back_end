#!/usr/bin/env python3
"""module application"""

from flask import Flask, render_template, request, g
from flask_babel import Babel
import pytz
from pytz import timezone
import pytz.exceptions

app = Flask(__name__)
babel = Babel(app)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@app.before_request
def before_request():
    """define g.user to send to template"""
    g.user = get_user()


class Config(object):
    """configuration language"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel.init_app(app)


@babel.localeselector
def get_locale():
    """define the best language"""
    locale = request.args.get('locale')
    if locale:
        return locale

    if g.user:
        locale = g.user.get("locale")
        if locale:
            return locale

    locale = request.headers.get("locale")
    if locale:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone():
    """define the best timezone"""
    timezone_str = request.args.get('timezone')

    try:
        timezone_str = request.args.get('timezone')
        if timezone_str and pytz.timezone(timezone_str):
            return timezone_str

        if g.user:
            timezone_str = g.user.get("timezone")
            if timezone_str and pytz.timezone(timezone_str):
                return timezone_str
    except pytz.exceptions.UnknownTimeZoneError:
        return 'UTC'

    return request.accept_languages.best_match(app.config
                                               ['BABEL_DEFAULT_LOCALE'])


@app.route('/', methods=["GET"])
def hello():
    """print hello world"""
    return render_template("7-index.html")


def get_user():
    """find a user in users dict or use locale information"""
    login = request.args.get('login_as')
    if login:
        user = users.get(int(login))
        return user
    return None


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
