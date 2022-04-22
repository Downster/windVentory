import os
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_cors import CORS
from flask import Flask, request, session, redirect
from .extensions import db, migrate, login_manager, admin
from .api.user_routes import user_routes
from .api.team_routes import team_routes
from .api.auth_routes import auth_routes
from .api.event_routes import event_routes
from .api.job_sites import jobsite_routes
from flask_admin.contrib.sqla import ModelView
from .models import User
from .seeds import seed_commands
from dotenv import load_dotenv, find_dotenv

def create_app():
    #app configuration
    app = Flask(__name__)
    load_dotenv(find_dotenv())
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    CORS(app)
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
    app.register_blueprint(user_routes, url_prefix='/users')
    app.register_blueprint(team_routes, url_prefix='/teams')
    app.register_blueprint(auth_routes, url_prefix='/auth')
    app.register_blueprint(jobsite_routes, url_prefix='/jobsites')
    # app.register_blueprint(auth_routes, url_prefix='/api/events')
    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                code = 301
                return redirect(url, code=code)



    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            'csrf_token',
            generate_csrf(),
            secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
            samesite='Strict' if os.environ.get(
                'FLASK_ENV') == 'production' else None,
            httponly=True)
        return response


    return app