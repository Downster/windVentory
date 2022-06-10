from email.mime import image
from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Material(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, ForeignKey('material_class.id'))
    storage_id = db.Column(db.Integer, ForeignKey('storage_location.id'))
    name = db.Column(db.String(40), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    image = image = db.Column(db.String(255), nullable=False)
    

    #relationships
    Material_class = relationship('MaterialClass', backref='mat_class')
    storage_location = relationship('StorageLocation', backref='storage_location')



    def to_dict(self):
        return {
            'id': self.id,
            'class_id': self.class_id,
            'storage_id': self.storage_id,
            'name': self.name,
            'quantity': self.quantity,
            'image': self.image,
            'class': self.Material_class.to_dict()
        }

    
