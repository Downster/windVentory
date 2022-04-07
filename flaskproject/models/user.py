from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


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

    #relationships
    teams = db.relationship('Team', back_populates='team_members', secondary=user_Teams)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName' : self.last_name,
            'phoneNumber' : self.phone_number,
            'email': self.email,
            'image': self.image,
            'online': self.online
        }

    def team_to_dict(self):
        return {
            'team': [team.to_dict() for team in self.teams]
        }


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

    def to_dict(self):
        return {
            'id': self.id,
            'tower_id': self.tower_id,
            'lead_id': self.lead_id,
            'jobsite_id': self.jobsite_id,
            'job_type': self.job_type,
            'team_members': [user.to_dict() for user in self.team_members],
            # 'member_ids': [user for user in self.team_members],
            'team_lead': self.team_lead.to_dict()
            # 'team_lead_id': [user.id for user in self.team_lead],
        }

    


