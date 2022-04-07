from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    team_id = db.Column(db.Integer, ForeignKey('team.id'))
    note_text = db.Column(db.String, nullable=False)


    #relationships
    user = relationship('User', backref='user_note')
    team = relationship('Team', backref='team_note')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id,
            'note': self.note_text,
        }