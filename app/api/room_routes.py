from flask import Blueprint, request
from flask_login import current_user
from ..extensions import db
from ..models import Room, Chat, User
from ..forms import TeamRoomForm, SiteRoomForm
from .auth_routes import token_required


def error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

room_routes = Blueprint('rooms', __name__)


# todo
#get chatrooms for user jobsite and user team




@room_routes.route('/site/<int:siteId>')
@token_required
def get_room(current_user, siteId):
    rooms = Room.query.filter_by(jobsite_id = siteId).all()
    return {'rooms' : [room.to_dict() for room in rooms]}


@room_routes.route('/team', methods=['POST'])
@token_required
def create_team_room(current_user):
    form = TeamRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = Room(
            user_id=current_user.id, 
            room_name=form['room_name'].data,
            team_id=form['team_id'].data,
            site_id=form.data['site_id']
            )
        db.session.add(room)
        db.session.commit()
        return room.to_dict()
    return {'errors': error_messages(form.errors)}, 401


@room_routes.route('/site', methods=['POST'])
@token_required
def create_site_room(current_user):
    form = SiteRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = Room(
            user_id=current_user.id, 
            room_name=form['room_name'].data,
            jobsite_id=form.data['jobsite_id'],
            image = form.data['image']
            )
        db.session.add(room)
        db.session.commit()
        return room.to_dict()
    return {'errors': error_messages(form.errors)}, 401


@room_routes.route('/<int:roomId>', methods=['PATCH'])
@token_required
def edit_room(current_user, roomId):
    form = TeamRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = Room.query.get(int(roomId))
        room.room_name = form.data['room_name']
        db.session.commit()
        return room.to_dict()
    return {'errors': error_messages(form.errors)}, 401


@room_routes.route('/<int:roomId>', methods=['DELETE'])
@token_required
def delete_room(current_user, roomId):
    room = Room.query.get(roomId)
    data = room.to_dict()
    db.session.delete(room)
    db.session.commit()
    return data


@room_routes.route('/<int:roomId>/chats')
@token_required
def get_chats(current_user, roomId):
    chats = Chat.query.filter(Chat.room_id == roomId).all()
    return { 'chats': [chat.to_dict() for chat in chats] }


@room_routes.route('/<int:roomId>/join', methods=['PATCH'])
@token_required
def join_chatroom(current_user, roomId):
    room = Room.query.get(roomId)
    user = User.query.get(current_user.get_id())
    room.active_users.append(user)
    db.session.commit()
    return room.to_dict()


@room_routes.route('/<int:roomId>/leave', methods=['PATCH'])
@token_required
def leave_chatroom(current_user, roomId):
    room = Room.query.get(roomId)
    user = User.query.get(current_user.get_id())
    room.active_users.pop(room.active_users.index(user))
    db.session.commit()
    return room.to_dict()