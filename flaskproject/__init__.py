import imp
from flask import Flask
from .extensions import db, migrate, login_manager, admin
from .api.main import main
from .api.user_routes import user_routes
from .api.team_routes import team_routes
from .api.auth_routes import auth_routes
from .api.event_routes import event_routes
from flask_admin.contrib.sqla import ModelView
from .models.connex import Connex
from .models.material import Material
from .models.chat import Chat
from .models.events import Event
from .models.joinNotification import JoinNotification
from .models.materialClass import MaterialClass
from .models.msdsInfo import msdsInfo
from .models.notes import Note
from .models.storageLocation import StorageLocation
from .models.storageType import StorageType
from .models.tower import Tower
from .models.user import User, Team, user_Teams
from .models.jobSite import JobSite
from .seeds import seed_commands

def create_app():
    #app configuration
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SECRET_KEY'] = 'mysecret'

    # Tell flask about our seed commands
    app.cli.add_command(seed_commands)

    # Setup all additional flask apps
    db.init_app(app)
    admin.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    
    # Setup user loader
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    
    #register blueprints here
    app.register_blueprint(main)
    app.register_blueprint(user_routes, url_prefix='/users')
    app.register_blueprint(team_routes, url_prefix='/teams')
    app.register_blueprint(auth_routes, url_prefix='/auth')
    # app.register_blueprint(auth_routes, url_prefix='/api/events')


    #add admin views here
    admin.add_view(ModelView(Chat, db.session))
    admin.add_view(ModelView(Event, db.session))
    admin.add_view(ModelView(JoinNotification, db.session))
    admin.add_view(ModelView(MaterialClass, db.session))
    admin.add_view(ModelView(msdsInfo, db.session))
    admin.add_view(ModelView(Note, db.session))
    admin.add_view(ModelView(StorageLocation, db.session))
    admin.add_view(ModelView(StorageType, db.session))
    admin.add_view(ModelView(Material, db.session))
    admin.add_view(ModelView(Team, db.session))
    admin.add_view(ModelView(Connex, db.session))
    admin.add_view(ModelView(JobSite, db.session))
    admin.add_view(ModelView(Tower, db.session))
    admin.add_view(ModelView(User, db.session))
    # admin.add_view(ModelView(user_Teams, db.session))

    return app