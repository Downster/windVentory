import os
from flask_wtf.csrf import generate_csrf
from flask_cors import CORS
from flask import Flask, request, redirect
from .extensions import db, migrate, socketio
from .api.user_routes import user_routes
from .api.team_routes import team_routes
from .api.auth_routes import auth_routes
from .api.event_routes import event_routes
from .api.room_routes import room_routes
from .api.job_sites import jobsite_routes
from .api.inventory_routes import inventory_routes
from .api.message_routes import message_routes
from .models import User
from .seeds import seed_commands
from .socketIO import socketio

#app configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')
CORS(app)


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

# Setup all additional flask apps
db.init_app(app)
migrate.init_app(app, db)
socketio.init_app(app)




#register blueprints here
app.register_blueprint(user_routes, url_prefix='/users')
app.register_blueprint(team_routes, url_prefix='/teams')
app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(jobsite_routes, url_prefix='/jobsites')
app.register_blueprint(room_routes, url_prefix='/rooms')
app.register_blueprint(message_routes, url_prefix='/messages')
app.register_blueprint(inventory_routes, url_prefix='/inventory')
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


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

if __name__ == '__main__':
    socketio.run(app)
