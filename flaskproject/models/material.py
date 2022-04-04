from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Material(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, ForeignKey('material_class.id'))
    storage_id = db.Column(db.Integer, ForeignKey('storage_location.id'))
    name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.String, nullable=False)
    unit = db.Column(db.String, nullable=False)
    

    #relationships
    Material_class = relationship('MaterialClass', backref='mat_class')
    storage_location = relationship('StorageLocation', backref='storage_location')

    
