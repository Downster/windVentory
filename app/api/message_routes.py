from .auth_routes import token_required
from ..forms import MessageForm
from flask import Blueprint, request
from datetime import datetime
from ..models import Message
from ..extensions import db
from ..utils import form_validation_errors


message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
@token_required
def create_message(current_user):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            user_id=current_user.id,
            room_id=form.data['room_id'],
            message=form.data['message'],
            created_at=datetime.utcnow()
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401

@message_routes.route('/<int:roomId>')
@token_required
def get_room_messages(current_user, roomId):
    messages = Message.query.filter_by(room_id = roomId).all()
    return {'messages' : [message.to_dict() for message in messages]}
