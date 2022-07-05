from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, Email
from ..models import User


def user_exists(form, field):
    # Checking if user already exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')




class CreateUserForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message='Email address is required'), Email(message="Please input a valid email address"), user_exists, Length(min=3, max=255, message='Email must be between 3 and 255 characters.')])
    password = StringField('password', validators=[DataRequired(message='Password is required')])
    firstName = StringField('firstName', validators=[DataRequired(message='First name is required'), Length(min=3, max=50, message='First name must be between 3 and 50 characters.')])
    lastName = StringField('lastName', validators=[DataRequired(message='Last name is required'), Length(min=3, max=50, message='Last name must be between 3 and 50 characters.')])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired(message='Phone number is required'), Length(min=11, max=14, message='Please input a valid phone number.')])
    roleId = IntegerField('roleId', validators=[DataRequired(message='Role is required')])