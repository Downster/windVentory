import os
from flask import Flask
from .extensions import db, migrate, login_manager, admin
from .api.user_routes import user_routes
from .api.team_routes import team_routes
from .api.auth_routes import auth_routes
from .api.event_routes import event_routes
from .api.job_sites import jobsite_routes
from flask_admin.contrib.sqla import ModelView
from .models import db
from .seeds import seed_commands
from dotenv import load_dotenv, find_dotenv

def create_app():
    #app configuration
    app = Flask(__name__)
    load_dotenv(find_dotenv())
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

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
        return db.User.query.get(int(user_id))

    
    #register blueprints here
    app.register_blueprint(user_routes, url_prefix='/users')
    app.register_blueprint(team_routes, url_prefix='/teams')
    app.register_blueprint(auth_routes, url_prefix='/auth')
    app.register_blueprint(jobsite_routes, url_prefix='/jobsites')
    # app.register_blueprint(auth_routes, url_prefix='/api/events')


    #add admin views here
    admin.add_view(ModelView(db.Chat, db.session))
    admin.add_view(ModelView(db.Event, db.session))
    admin.add_view(ModelView(db.JoinNotification, db.session))
    admin.add_view(ModelView(db.MaterialClass, db.session))
    admin.add_view(ModelView(db.msdsInfo, db.session))
    admin.add_view(ModelView(db.Note, db.session))
    admin.add_view(ModelView(db.StorageLocation, db.session))
    admin.add_view(ModelView(db.StorageType, db.session))
    admin.add_view(ModelView(db.Material, db.session))
    admin.add_view(ModelView(db.Team, db.session))
    admin.add_view(ModelView(db.Connex, db.session))
    admin.add_view(ModelView(db.JobSite, db.session))
    admin.add_view(ModelView(db.Tower, db.session))
    admin.add_view(ModelView(db.User, db.session))
    # admin.add_view(ModelView(user_Teams, db.session))

    return app