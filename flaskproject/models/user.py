from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from flask_login import UserMixin


#Join table for user sites
user_sites = db.Table('user_site',
        db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True),
        db.Column('site_id', db.Integer, ForeignKey('job_site.id'), primary_key=True)
    )



#Join table for user teame
user_teams = db.Table('user_team', 
        db.Column('user_id', db.Integer, ForeignKey('user.id')),
        db.Column('team_id', db.Integer, ForeignKey('team.id')))




#User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)
    team_lead = db.Column(db.Boolean, nullable=False)
    job_site = relationship('JobSite', secondary=user_sites, backref='members')
    teams = relationship('Team', secondary=user_teams, backref='teammates')



#Job site model
class JobSite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team= relationship('Team')
    connex= relationship('Connex', uselist=False)
    teams = relationship('Team', backref='job_site')
    towers = relationship('Tower', backref='job_site')
    name= db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    teams = db.Column(db.Integer, nullable=False)
    client = db.Column(db.String, nullable=False)





#Team model
class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    jobsite = relationship('JobSite')
    job_type = db.Column(db.String, nullable=False)
