from email.policy import default
from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from .chat_room import active_members
from werkzeug.security import generate_password_hash, check_password_hash


user_Teams = db.Table(
    'user_Team',
    db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True),
    db.Column('team_id', db.Integer, ForeignKey('team.id'), primary_key=True),
)

user_Role = db.Table(
    'user_Role',
    db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True),
    db.Column('role_id', db.Integer, ForeignKey('role.id'), primary_key=True)
)


#User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    image = db.Column(db.String(255), default='https://windventory.s3.amazonaws.com/73e0e9c55dd04ba284e933cfa4d9c07a.png')
    online = db.Column(db.Boolean, default=False)

    #relationships
    rooms = relationship('ChatRoom', back_populates='user')
    messages = relationship('Message', back_populates='user')
    teams = relationship('Team', back_populates='team_members', secondary=user_Teams)
    current_room = relationship('ChatRoom', back_populates='active_members', secondary=active_members)
    user_jobsite = relationship('JobSite', back_populates='users_site')
    roles = relationship('Role', back_populates='users', secondary=user_Role)

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
            'online': self.online,
            'jobsite_id': self.jobsite_id,
            'role': [role.to_name() for role in self.roles],
            'teams': [team.to_dict() for team in self.teams],
        }
    def to_team_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName' : self.last_name,
            'phoneNumber' : self.phone_number,
            'email': self.email,
            'jobsite_id': self.jobsite_id,
        }
    def to_role(self):
        return {
            role.to_name() for role in self.roles
        }
    def to_name(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName' : self.last_name,
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
    team_jobsite = relationship('JobSite', back_populates='teams_site')
    rooms = relationship('ChatRoom', back_populates='team', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'tower_id': self.tower_id,
            'lead_id': self.lead_id,
            'jobsite_id': self.jobsite_id,
            'job_type': self.job_type,
            'team_lead': self.team_lead.to_team_dict(),
            'team_members': [member.to_team_dict() for member in self.team_members]
        }


class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    
    #relationships
    users = relationship('User', back_populates='roles', secondary=user_Role)

    def to_name(self):
        return self.name
    


