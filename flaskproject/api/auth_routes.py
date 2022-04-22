import json
from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import check_password_hash, generate_password_hash
from functools import wraps
import os
import jwt
import uuid
import datetime
from ..forms.signup import SignUpForm
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

def validation_errors_to_error_messages(validation_errors):
    """
    Turns validation errors into an error message for frontend
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


@auth_routes.route('/login', methods=['POST'])
def login():
    auth = request.json
    print(auth['username'])

    if not auth or not auth['username'] or not auth['password']:
        return make_response('Could not verify', 401)

    user = User.query.filter_by(email=auth['username']).first()
    print(user)

    if not user:
        return make_response('Could not verify', 401)

    if check_password_hash(user.password, auth['password']):
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=200)}, os.environ.get("SECRET_KEY"), algorithm="HS256")

        return jsonify({
            "user": user.to_dict(),
            "token": token})
    
    return make_response('Could not verify', 401,)




@auth_routes.route('/logout', methods=['DELETE'])
@token_required
def logout(current_user):
    return jsonify({'message': 'logged out'})


@auth_routes.route('/signup', methods=['POST'])
def sign_up():

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    hashed_password = generate_password_hash(form.data['password'], method='sha256')
    if form.validate_on_submit():
        user = User(
            public_id = str(uuid.uuid4()),
            email=form.data['email'],
            first_name = form.data['firstName'],
            last_name = form.data['lastName'],
            phone_number = form.data['phoneNumber'],
            password=hashed_password,
        )
        db.session.add(user)
        db.session.commit()
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=200)}, os.environ.get("SECRET_KEY"), algorithm="HS256")
        return jsonify({
            'user': user.to_dict(),
            'token' : token
        })
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    pass