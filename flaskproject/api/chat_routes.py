
from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from ..models import Chat
from ..extensions import db

def validation_errors_to_message(errors):
   pass

chat_routes = Blueprint('chats', __name__)

@chat_routes.route('/', methods=['POST'])
def create_chat():
    form = ChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chat = Chat(
            user_id=current_user.get_id(),
            room_id=form['room_id'].data,
            message=form['message'].data,
            created_at=datetime.utcnow()
        )
        db.session.add(chat)
        db.session.commit()
        return chat.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401