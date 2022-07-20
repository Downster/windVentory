from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length, ValidationError
from ..models import ChatRoom
from sqlalchemy import func


def room_exists(form, field):
    # Checking if room name is already in use
    room_name = field.data
    room_id = form.data['room_id']
    current_room = ChatRoom.query.get(room_id)
    room = ChatRoom.query.filter(func.lower(ChatRoom.room_name) == func.lower(room_name), ChatRoom.jobsite_id == form.data['jobsite_id']).first()
    if room:
        if room != current_room:
            raise ValidationError('This room already exists')
        else:
            pass

class EditSiteRoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired(message='You must provide a room name'), Length(min=3, max=40, message="Chat Room name must be between 3 and 40 characters."), room_exists])
    jobsite_id = IntegerField('jobsite_id')
    image = FileField('image')
    room_id = IntegerField('room_id')