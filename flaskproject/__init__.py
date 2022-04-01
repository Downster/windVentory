import imp
from flask import Flask
from .extensions import db, migrate, login_manager, admin
from .api.main import main
from .api.user_routes import user_routes
from .api.team_routes import team_routes
from .api.auth_routes import auth_routes
from flask_admin.contrib.sqla import ModelView
from .models.chemical import Chemical
from .models.connex import Connex
from .models.material import Material
from .models.tower import Tower
from .models.user import User, JobSite, Team

def create_app():
    #app configuration
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SECRET_KEY'] = 'mysecret'

    
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
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(team_routes, url_prefix='/api/teams')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')


    #add admin views here
    admin.add_view(ModelView(Chemical, db.session))
    admin.add_view(ModelView(Material, db.session))
    admin.add_view(ModelView(Team, db.session))
    admin.add_view(ModelView(Connex, db.session))
    admin.add_view(ModelView(JobSite, db.session))
    admin.add_view(ModelView(Tower, db.session))
    admin.add_view(ModelView(User, db.session))

    return app