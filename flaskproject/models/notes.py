from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Note(db.Model):
    __tablename__ = 'Note'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    team_id = db.Column(db.Integer, ForeignKey('team.id'))
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    note_text = db.Column(db.String, nullable=False)


    #relationships
    user = relationship('User', backref='user_note')
    team = relationship('Team', backref='team_note')
    jobsite = relationship('JobSite', back_populates='site_notes')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id,
            'note': self.note_text,
        }