from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    team_id = db.Column(db.Integer, ForeignKey('team.id'))
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    job_type = db.Column(db.String, nullable=False)


    #relationships
    user = relationship('User', backref="user_chat")
    team = relationship('Team', backref="team_chat")
    jobsite = relationship('JobSite', backref='jobsite_chat')