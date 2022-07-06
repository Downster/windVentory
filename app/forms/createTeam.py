from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from ..models import Team



def team_exists(form, field):
    # Checking if Jobsite already exists
    lead_id = field.data
    lead = Team.query.filter(Team.lead_id == lead_id).first()
    if lead:
        raise ValidationError('This team already exists')

class CreateTeamForm(FlaskForm):
    jobsite_id = IntegerField('jobsite_id', validators=[DataRequired(message='Jobsite Id required')])
    lead_id = IntegerField('lead_id', validators=[DataRequired(message='Lead Id required'), team_exists])
    job_type = StringField('job_type', validators=[DataRequired(message='Job type is required'), Length(min=3, max=20, message="Job type must be beweeen 3 and 20 characters")])