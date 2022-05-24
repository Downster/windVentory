from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


#Job site model
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    team_id = db.Column(db.Integer, ForeignKey('team.id'), nullable=False)
    summary = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    #relationships
    users = relationship('User', backref='event_users')
    team = relationship('Team', backref='event_team')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id,
            'summary': self.summary,
            'description': self.description,
            'start_time': self.start_time,
            'end_time': self.end_time
        }


