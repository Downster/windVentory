import json
from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import check_password_hash
from flask_login import login_required, login_user
from functools import wraps
import os
import jwt
import datetime

from ..extensions import db
from ..models.user import User

auth_routes = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            data = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms="HS256")
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': "Token is invalid"}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated


@auth_routes.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!'})

    user = User.query.filter_by(email=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=200)}, os.environ.get("SECRET_KEY"), algorithm="HS256")

        return jsonify({"token": token})
    
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!'})




@auth_routes.route('/logout')
@token_required
def logout(current_user):
    pass


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    pass

@auth_routes.route('/unauthorized')
def unauthorized():
    pass