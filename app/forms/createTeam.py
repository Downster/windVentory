from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length



class CreateTeamForm(FlaskForm):
    jobsite_id = IntegerField('jobsite_id', validators=[DataRequired()])
    lead_id = IntegerField('lead_id', validators=[DataRequired()])
    job_type = StringField('job_type', validators=[DataRequired(), Length(min=3, max=20, message="Job type must be beweeen 3 and 20 characters")])