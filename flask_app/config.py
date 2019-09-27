import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or '@myKey@'
    DEBUG = True
    CSRF_ENABLED = True
    SERVER_NAME = '0.0.0.0:5000'


class Configdb(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'flask_app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
