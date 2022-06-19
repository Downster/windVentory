from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length, ValidationError
from ..models import ChatRoom
from sqlalchemy import func


def room_exists(form, field):
    # Checking if room name is already in use
    room_name = field.data
    room = ChatRoom.query.filter(func.lower(ChatRoom.room_name) == func.lower(room_name), ChatRoom.team_id == form.data['team_id']).first()
    if room:
        raise ValidationError('Channel already exists')

class TeamRoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired(), Length(min=1, max=40, message="Chat Room name must be less than 40 characters."), room_exists])
    team_id = IntegerField('team_id')
    image = FileField('image')