from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class MaterialClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    material_class = db.Column(db.String, nullable=False)
    material_subclass = db.Column(db.String, nullable=False)
    unit = db.Column(db.String, nullable=False)
    

    #relationships


    def to_dict(self):
        return {
            'id': self.id,
            'materialClass': self.material_class,
            'materialSubclass': self.material_subclass,
            'unit' : self.unit
        }
    
    
