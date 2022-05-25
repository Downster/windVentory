from ..forms import MessageForm
from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from ..models import Message
from ..extensions import db
from ..utils import form_validation_errors


message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
def create_chat():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            user_id=current_user.id,
            room_id=form['room_id'],
            message=form['message'],
            created_at=datetime.utcnow()
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401