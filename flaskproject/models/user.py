from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from flask_login import UserMixin


user_Teams = db.Table(
    'user_Team',
    db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True),
    db.Column('team_id', db.Integer, ForeignKey('team.id'), primary_key=True),
    db.Column('team_lead', db.Boolean, nullable=False))



#User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    image = db.Column(db.String(255))
    online = db.Column(db.Boolean, default=False)

    teams = db.relationship('Team', back_populates='team_members', secondary=user_Teams)


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tower_id = db.Column(db.Integer, ForeignKey('tower.id'))
    lead_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'), nullable=False)
    job_type = db.Column(db.String, nullable=False)


    #relationships
    tower = relationship('Tower', backref='team_id')
    team_lead = relationship('User', backref='lead_id')
    team_members = relationship('User', back_populates='teams', secondary=user_Teams)
    jobsite = relationship('JobSite', backref='team_jobsite')

    


