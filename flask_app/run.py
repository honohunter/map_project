from flask import Flask
from config import Configdb, Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_static_compress import FlaskStaticCompress

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)
compress = FlaskStaticCompress(app)
app.config.from_object(Config)
app.config.from_object(Configdb)

app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

api = Api(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)

import models, resources, views

api.add_resource(resources.SignUp, '/signup')
api.add_resource(resources.Login, '/login')
api.add_resource(resources.LogoutAccess, '/logout/access')
api.add_resource(resources.LogoutRefresh, '/logout/refresh')
api.add_resource(resources.TokenRefresh, '/token/refresh')
api.add_resource(resources.UserLocation, '/location')
api.add_resource(resources.SecretResource, '/secret')


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return models.RevokedTokenModel.is_jti_blacklisted(jti)


if __name__ == '__main__':
    app.run()
