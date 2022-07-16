from flask import Blueprint, request, jsonify
from .auth_routes import token_required
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db
from ..models.user import User, Role, Team
from ..forms import CreateUserForm, EditUserForm
from ..utils import form_validation_errors
import requests
import os

user_routes = Blueprint('users', __name__)



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
    leads = [user for user in users if user.to_role() == {'Lead'} or user.to_role() == {'Supervisor'} or user.to_role() == {'Admin'}]
    return jsonify({'leads' : [lead.to_name() for lead in leads]})




#Create user as admin -- requires a token and backend role authentication
@user_routes.route('/new', methods=['POST'])
@token_required
def admin_create_user(current_user):
    if current_user.to_role() == {'Admin'}:
        form = CreateUserForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
        
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
        return {'errors': form_validation_errors(form.errors)}, 401
    return {'Unauthorized' : 'You must be an admin to add a user'}, 401


#Delete a specific user -- requires token and admin privlidges
@user_routes.route('/<id>', methods=['DELETE'])
@token_required
def admin_delete_user(current_user, id):
    if current_user.to_role() == {'Admin'}:
        user = User.query.get(id)
        team = Team.query.filter(Team.lead_id == user.id).first()
        if team:
            return {'errors' : 'Please delete this users team first'}, 401

        if not user:
            return jsonify({'errors': 'user does not exist'})

        db.session.delete(user)
        db.session.commit()

        return jsonify({'userId': id})
    return {'Unauthorized' : 'You must be an admin to delete a user'}, 401

#Edit a user -- requires token and admin role
@user_routes.route('/<id>', methods=['PATCH'])
@token_required
def admin_edit_user(current_user, id):
    if current_user.to_role() == {'Admin'}:
        form = EditUserForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        user = User.query.get(id)

        if not user:
            return jsonify({'message': 'user does not exist'})
        if form.validate_on_submit():
            role = Role.query.get(form.data['roleId'])
            user.email = form.data['email']
            user.first_name = form.data['firstName']
            user.last_name = form.data['lastName']
            user.phone_number = form.data['phoneNumber']
            user.roles = [role]
            db.session.commit()
            return jsonify({'user': user.to_dict()})
        return {'errors': form_validation_errors(form.errors)}, 401
    return {'Unauthorized' : 'You must be an admin to delete a user'}, 401

@user_routes.route('/<int:id>/hotel', methods=['PATCH'])
@token_required
def set_hotel(current_user, id):
    user = User.query.get(id)
    data = request.json
    user.hotel_latitude = data['hotel_latitude']
    user.hotel_longitude = data['hotel_longitude']
    db.session.commit()
    return data, 200


@user_routes.route('/nearby/<string:type>', methods=['GET'])
@token_required
def get_nearby(current_user, type):
    lat = current_user.hotel_latitude
    lng = current_user.hotel_longitude
    key = os.environ.get('GOOGLE_API')
    payload={}
    headers = {}
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=6000&type={type}&key={key}"

    response = requests.request("GET", url, headers=headers, data=payload)
    return response.json(), 200
