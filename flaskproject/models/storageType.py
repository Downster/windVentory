from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class StorageType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    

    #relationships

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
        }


    
