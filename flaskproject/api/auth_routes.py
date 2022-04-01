from flask import Blueprint
from flask_login import login_required, login_user

from ..extensions import db
from ..models.user import User

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/')

def users():
    pass


@auth_routes.route('/login', methods=['POST'])
def login():
    pass


@auth_routes.route('/logout')
def logout():
    pass


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    pass

@auth_routes.route('/unauthorized')
def unauthorized():
    pass