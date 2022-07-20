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
    room = ChatRoom.query.filter(func.lower(ChatRoom.room_name) == func.lower(room_name), ChatRoom.team_id == form.data['team_id']).first()
    if room:
        if room != current_room:
            raise ValidationError('This room already exists')
        else:
            pass

class EditTeamRoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired(), Length(min=1, max=40, message="Chat Room name must be less than 40 characters."), room_exists])
    team_id = IntegerField('team_id')
    image = FileField('image')
    room_id = IntegerField('room_id')