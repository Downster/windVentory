from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length, ValidationError
from ..models import ChatRoom
from sqlalchemy import func


def room_exists(form, field):
    # Checking if room name is already in use
    room_name = field.data
    room = ChatRoom.query.filter(func.lower(ChatRoom.room_name) == func.lower(room_name), ChatRoom.jobsite_id == form.data['jobsite_id']).first()
    if room:
        raise ValidationError('Channel already exists')


class SiteRoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired(message='You must provide a room name'), Length(min=3, max=40, message="Chat Room name must be between 3 and 40 characters."), room_exists])
    jobsite_id = IntegerField('jobsite_id')
    image = FileField('image')