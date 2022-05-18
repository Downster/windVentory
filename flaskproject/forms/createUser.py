from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from ..models import User


def user_exists(form, field):
    # Checking if user already exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')




class CreateUserForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, Length(min=3, max=255, message='Email must be between 3 and 255 characters.')])
    password = StringField('password', validators=[DataRequired()])
    firstName = StringField('firstName', validators=[DataRequired(), Length(min=3, max=50, message='First name must be between 3 and 50 characters.')])
    lastName = StringField('lastName', validators=[DataRequired(), Length(min=3, max=50, message='Last name must be between 3 and 50 characters.')])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired(), Length(min=11, max=14, message='Please input a valid phone number.')])
    roleId = IntegerField('roleId', validators=[DataRequired()])