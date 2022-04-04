from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


class JoinNotification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    team_id = db.Column(db.Integer, ForeignKey('team.id'))
    seen = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    message = db.Column(db.String, nullable=False)


    #relationships
    user = relationship('User', backref='user_join')
    team = relationship('Team', backref='team_join')

