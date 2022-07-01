from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length



class CreateTeamForm(FlaskForm):
    jobsite_id = IntegerField('jobsite_id', validators=[DataRequired(message='Jobsite Id required')])
    lead_id = IntegerField('lead_id', validators=[DataRequired(message='Lead Id required')])
    job_type = StringField('job_type', validators=[DataRequired(message='Job type is required'), Length(min=3, max=20, message="Job type must be beweeen 3 and 20 characters")])