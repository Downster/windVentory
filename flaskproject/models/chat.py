from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from datetime import datetime


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    room_id = db.Column(db.Integer, ForeignKey('room.id'))
    message = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    #relationships
    user = db.relationship('User', back_populates='chats')
    room = db.relationship('Room', back_populates='chats')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'room_id': self.room_id,
            'message': self.message,
            'created_at': self.created_at
        }
