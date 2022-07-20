from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from ..models import User


def user_exists(form, field):
    # Checking if user already exists
    userId = form.data['userId']
    email = field.data
    current_user = User.query.get(userId)
    user = User.query.filter(User.email == email).first()
    if current_user != user:
        raise ValidationError('Email address is already in use.')




class EditUserForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message='Email is required'), user_exists, Length(min=3, max=255, message='Email must be between 3 and 255 characters.')])
    firstName = StringField('firstName', validators=[DataRequired(message='First name is required'), Length(min=3, max=50, message='First name must be between 3 and 50 characters.')])
    lastName = StringField('lastName', validators=[DataRequired(message='Last name is required'), Length(min=3, max=50, message='Last name must be between 3 and 50 characters.')])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired(message='Phone number is required'), Length(min=11, max=14, message='Please input a valid phone number.')])
    roleId = IntegerField('roleId', validators=[DataRequired(message='Role is required')])
    userId = IntegerField('userId')