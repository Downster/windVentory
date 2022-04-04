from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class MaterialClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    material_Class = db.Column(db.String, nullable=False)
    material_subClass = db.Column(db.String, nullable=False)
    

    #relationships
    
    
