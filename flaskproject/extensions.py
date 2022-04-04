from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin
from flask_admin import Admin


#setup extensions here
db = SQLAlchemy()
migrate = Migrate()
admin = Admin()
login_manager = LoginManager()