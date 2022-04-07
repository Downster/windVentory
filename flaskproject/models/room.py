from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

active_participants = db.Table(
    'active_participant',
    db.Column('room_id', db.Integer, ForeignKey('room.id'), primary_key=True),
    db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True)
)

class Room(db.Model):
    __tablename__ = 'room'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    team_id = db.Column(db.Integer, ForeignKey('team.id'))
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    room_name = db.Column(db.String(40), nullable=False)

    user = db.relationship('User', back_populates='rooms', foreign_keys=[user_id])
    team = db.relationship('Team', back_populates='rooms')
    chats = db.relationship('Chat', back_populates='room', cascade="all, delete")
    active_users = db.relationship('User', back_populates='current_room', secondary=active_participants)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id,
            'team': self.team.team_,
            'room_name': self.room_name,
            'chats': [chat.to_dict() for chat in self.chats],
            'group_owner_id': self.team.lead_id,
            'active_users': [user.to_dict() for user in self.active_users]
        }