from flask import Blueprint, request, jsonify
from .auth_routes import token_required
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from ..extensions import db
from ..models.user import User, Role
from ..forms import CreateUserForm

user_routes = Blueprint('users', __name__)


def error_messages(validation_errors):
    """
    Turns validation errors into an error message for frontend
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

#Get all users
@user_routes.route('')
@token_required
def users(current_user):
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


#Get all users who are team leads
@user_routes.route('/leads')
@token_required
def get_leads(current_user):
    users = User.query.all()
    leads = [user for user in users if user.to_role() == {'Lead'} or user.to_role() == {'Supervisor'}]
    return jsonify({'leads' : [lead.to_name() for lead in leads]})


@user_routes.route('/<public_id>')
@token_required
def user(current_user, public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'user does not exist'})


    return user.to_dict()

@user_routes.route('/<user_id>/role')
@token_required
def user_role(current_user, user_id):
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify(user.role_to_dict())

#Create user from signup page
@user_routes.route('', methods=['POST'])
def create_user():
    data = request.get_json()
    
    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(email=data['email'], first_name=data['first_name'], last_name=data['last_name'], password=hashed_password, phone_number=data['phone_number'], image=data['image'] )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message' : 'New user created'})


#Create user as admin -- requires a token and backend role authentication
@user_routes.route('/new', methods=['POST'])
@token_required
def admin_create_user(current_user):
    if current_user.to_role() == {'Admin'}:
        form = CreateUserForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            print('here')
            role = Role.query.get(form.data['roleId'])
            hashed_password = generate_password_hash(form.data['password'], method='sha256')

            new_user = User(
                email = form.data['email'], 
                first_name=form.data['firstName'], 
                last_name=form.data['lastName'], 
                password=hashed_password, 
                phone_number=form.data['phoneNumber'], 
                roles=[role] )
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'user' : new_user.to_dict()})
        return {'errors': error_messages(form.errors)}, 401
    return {'Unauthorized' : 'You must be an admin to add a user'}, 401



@user_routes.route('/<id>', methods=['DELETE'])
@token_required
def delete_user(id):
    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'user does not exist'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted'})

