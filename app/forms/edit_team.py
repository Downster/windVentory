from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from ..models import Team



def team_exists(form, field):
    # Checking if Jobsite already exists
    lead_id = field.data
    team_id = form.data['team_id']
    current_team = Team.query.get(team_id)
    team = Team.query.filter(Team.lead_id == lead_id).first()
    if team:
        if team != current_team:
            raise ValidationError('This leader is already on a team')
        else:
            pass

class EditTeamForm(FlaskForm):
    jobsite_id = IntegerField('jobsite_id', validators=[DataRequired(message='Jobsite Id required')])
    lead_id = IntegerField('lead_id', validators=[DataRequired(message='Lead Id required'), team_exists])
    job_type = StringField('job_type', validators=[DataRequired(message='Job type is required'), Length(min=3, max=20, message="Job type must be beweeen 3 and 20 characters")])
    team_id = IntegerField('team_id')