from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

active_members = db.Table(
    'active_member',
    db.Column('room_id', db.Integer, ForeignKey('chat_room.id'), primary_key=True),
    db.Column('user_id', db.Integer, ForeignKey('user.id'), primary_key=True)
)

class ChatRoom(db.Model):
    __tablename__ = 'chat_room'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    team_id = db.Column(db.Integer, ForeignKey('team.id'))
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    room_name = db.Column(db.String(40), nullable=False)
    image = db.Column(db.String(255), default='https://windventory.s3.amazonaws.com/73e0e9c55dd04ba284e933cfa4d9c07a.png')

    user = db.relationship('User', back_populates='rooms', foreign_keys=[user_id])
    team = db.relationship('Team', back_populates='rooms')
    messages = db.relationship('Message', back_populates='room', cascade="all, delete")
    active_members = db.relationship('User', back_populates='current_room', secondary=active_members)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id,
            'jobsite_id': self.jobsite_id,
            'image': self.image,
            'room_name': self.room_name,
            'messages': [message.to_dict() for message in self.messages],
            'active_members': [user.to_dict() for user in self.active_members]
        }