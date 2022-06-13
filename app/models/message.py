from ..extensions import db
from sqlalchemy import ForeignKey
from datetime import datetime


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    room_id = db.Column(db.Integer, ForeignKey('chat_room.id'))
    message = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    #relationships
    user = db.relationship('User', back_populates='messages')
    room = db.relationship('ChatRoom', back_populates='messages')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'room_id': self.room_id,
            'message': self.message,
            'created_at': self.created_at,
            'user': self.user.to_name()
        }
