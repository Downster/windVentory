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


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id,
            'seen': self.seen,
            'created_at': self.created_at,
            'message': self.message
        }

