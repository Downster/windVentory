from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length


class SiteRoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired(), Length(min=1, max=40, message="Chat Room name must be less than 40 characters.")])
    jobsite_id = IntegerField('jobsite_id')
    image = FileField('image')