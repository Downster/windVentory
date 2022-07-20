from flask import Blueprint, request
from ..extensions import db
from ..models import ChatRoom, Message, User
from ..forms import TeamRoomForm, SiteRoomForm, EditSiteRoomForm, EditTeamRoomForm
from .auth_routes import token_required
from ..utils import form_validation_errors
from ..awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

room_routes = Blueprint('rooms', __name__)


# todo
#get chatrooms for user jobsite and user team




@room_routes.route('/site/<int:siteId>')
@token_required
def get_room(current_user, siteId):
    rooms = ChatRoom.query.filter_by(jobsite_id = siteId).all()
    return {'rooms' : [room.to_dict() for room in rooms]}


@room_routes.route('/team/<int:teamId>')
@token_required
def get_team_room(current_user, teamId):
    rooms = ChatRoom.query.filter_by(team_id = teamId).all()
    return {'rooms' : [room.to_dict() for room in rooms]}


@room_routes.route('/team', methods=['POST'])
@token_required
def create_team_room(current_user):
    form = TeamRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = ChatRoom(
            user_id=current_user.id, 
            room_name=form['room_name'].data,
            team_id=form['team_id'].data,
            )
        db.session.add(room)
        db.session.commit()
        return room.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401


@room_routes.route('/site', methods=['POST'])
@token_required
def create_site_room(current_user):
    form = SiteRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image = form.data['image']
    if image:
        if not allowed_file(image.filename):
            return {"image_errors": "file type not allowed"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        url = upload["url"]
    if form.validate_on_submit():
        room = ChatRoom(
            user_id=current_user.id, 
            room_name=form['room_name'].data,
            jobsite_id=form.data['jobsite_id'],
            )
        if image:
            room.image = url
        db.session.add(room)
        db.session.commit()
        return room.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401


@room_routes.route('/team/<int:roomId>', methods=['PATCH'])
@token_required
def edit_team_room(current_user, roomId):
    form = EditTeamRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        room = ChatRoom.query.get(int(roomId))
        room.room_name = form.data['room_name']
        db.session.commit()
        return room.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401



@room_routes.route('/<int:roomId>', methods=['DELETE'])
@token_required
def delete_room(current_user, roomId):
    room = ChatRoom.query.get(roomId)
    db.session.delete(room)
    db.session.commit()
    return {'roomId': roomId}


@room_routes.route('/<int:roomId>/messages')
@token_required
def get_chats(current_user, roomId):
    messages = Message.query.filter(Message.room_id == roomId).all()
    return {'messages': [message.to_dict() for message in messages]}


@room_routes.route('/<int:roomId>/join', methods=['PATCH'])
@token_required
def join_chatroom(current_user, roomId):
    room = ChatRoom.query.get(roomId)
    user = User.query.get(current_user.id)
    room.active_members.append(user)
    db.session.commit()
    return room.to_dict()

@room_routes.route('/site/<int:roomId>', methods=['PATCH'])
@token_required
def edit_chatroom(current_user, roomId):
    form = EditSiteRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image = form.data["image"]
    if image:
        if not allowed_file(image.filename):
            return {"errors": ["Error: that file type is not allowed"]}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        url = upload["url"]
    if form.validate_on_submit():
        room = ChatRoom.query.get(roomId)
        room.room_name = form.data['room_name']
        if image:
            room.image = url
        db.session.commit()
        return room.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401



@room_routes.route('/<int:roomId>/leave', methods=['PATCH'])
@token_required
def leave_chatroom(current_user, roomId):
    room = ChatRoom.query.get(roomId)
    user = User.query.get(current_user.id)
    room.active_members.pop(room.active_members.index(user))
    db.session.commit()
    return room.to_dict()