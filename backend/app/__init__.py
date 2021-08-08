from flask import Flask

from flask_login import LoginManager
from .config import Config
from .auth import auth
from .models import UserModel


login_manger = LoginManager()
login_manger.login_view = 'auth.login'


@login_manger.user_loader
def load_user(user_id):
    return UserModel.query(user_id)


def create_app():
    
    app = Flask(__name__)
    


    app.config.from_object(Config)
    login_manger.init_app(app)
    app.register_blueprint(auth)
    
    return app