from email.mime import image
from ..awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import check_password_hash, generate_password_hash
from functools import wraps
import os
import jwt
import datetime
from ..forms.signup import SignUpForm
from ..extensions import db
from ..models.user import User, Role
from ..utils import form_validation_errors

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
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': "Token is invalid"}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated



@auth_routes.route('/login', methods=['POST'])
def login():
    auth = request.json

    if not auth['username'] and not auth['password']:
        return {'errors': 'Please input a username and password'}, 401
    if not auth['username']:
        return {'errors': 'Please input an email'}, 401
    if not auth['password']:
        return {'errors': 'Please input a password'}, 401

    user = User.query.filter_by(email=auth['username']).first()
    if not user:
        return {'errors' : 'Incorrect credentials'}, 401


    user.online = True
    db.session.commit()

    if check_password_hash(user.password, auth['password']):
        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=200)}, os.environ.get("SECRET_KEY"), algorithm="HS256")


        return jsonify({
            "user": user.to_dict(),
            "token": token})
    
    return {'errors': 'Incorrect credentials'}, 401



@auth_routes.route('/restore')
@token_required
def restore(current_user):
    current_user.online = True
    db.session.commit()
    return jsonify({'user': current_user.to_dict()})


@auth_routes.route('/logout', methods=['DELETE'])
@token_required
def logout(current_user):
    current_user.online = False
    db.session.commit()
    return jsonify({'message': 'logged out'})


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    hashed_password = generate_password_hash(form.data['password'], method='sha256')
    image = form.data["image"]
    if form.validate_on_submit():
        image = form.data["image"]
        if image != 'null':
            if not allowed_file(image.filename):
                return {"errors": "file type not allowed"}, 400
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        params = {
        'email': form.data['email'],
        'first_name': form.data['firstName'],
        'last_name': form.data['lastName'],
        'phone_number' : form.data['phoneNumber'],
        'password': hashed_password,
        'online' : True
        }
        if image != 'null':
            params['image'] = url
        user = User(**params)
        db.session.add(user)
        db.session.commit()
        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=200)}, os.environ.get("SECRET_KEY"), algorithm="HS256")
        return jsonify({
            'user': user.to_dict(),
            'token' : token
        })
    return {'errors': form_validation_errors(form.errors)}, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    pass