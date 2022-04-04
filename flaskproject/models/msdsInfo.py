from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class msdsInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mat_id = db.Column(db.Integer, ForeignKey('material.id'))
    msds_link = db.Column(db.String, nullable=False)
    

    #relationships
    material = relationship('Material', backref='msds')