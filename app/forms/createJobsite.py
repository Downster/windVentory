from flask_wtf import FlaskForm
from wtforms import StringField, FileField, DecimalField
from wtforms.validators import DataRequired, ValidationError, Length
from ..models import JobSite


def jobsite_exists(form, field):
    # Checking if user already exists
    name = field.data
    site = JobSite.query.filter(JobSite.name == name).first()
    if site:
        raise ValidationError('This jobsite already exists')




class CreateSiteForm(FlaskForm):
    siteName = StringField('siteName', validators=[DataRequired(message="You must provide a site name"), jobsite_exists, Length(min=3, max=40, message='Jobsite must be between 3 and 40 characters')])
    state = StringField('state', validators=[DataRequired(message="You must provide a state")])
    client = StringField('client', validators=[DataRequired(message="You must provide a client name"), Length(min=3, max=60, message="Client name must be beweeen 3 and 60 characters")])
    latitude = DecimalField('latitude', validators=[DataRequired(message="You must provide a latitude")])
    longitude = DecimalField('longitude', validators=[DataRequired(message="You must provide a longitude")])
    image = FileField('image')