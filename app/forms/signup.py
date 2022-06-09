from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, ValidationError, Length, Email
from ..models import User


def user_exists(form, field):
    # Checking if user already exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')




class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired("Please input an email"), Email(message="Please input a valid email address"), user_exists, Length(min=3, max=255, message='Email must be between 3 and 255 characters.')])
    password = StringField('password', validators=[DataRequired('Please input a password'), Length(min=6, max=20, message='Password must be between 6 and 20 characters')])
    firstName = StringField('firstName', validators=[DataRequired('Please input a first name'), Length(min=2, max=50, message='First name must be between 3 and 50 characters.')])
    lastName = StringField('lastName', validators=[DataRequired('Please input a last name'), Length(min=3, max=50, message='Last name must be between 3 and 50 characters.')])
    phoneNumber = StringField('phoneNumber', validators=[DataRequired('Please input a phone number'), Length(min=10, max=10, message='Please input a valid, 10 digit, U.S. phone number, with no dashes')])
    image = FileField('image')