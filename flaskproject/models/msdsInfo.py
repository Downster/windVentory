from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class msdsInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mat_id = db.Column(db.Integer, ForeignKey('material.id'))
    msds_link = db.Column(db.String, nullable=False)
    

    #relationships
    material = relationship('Material', backref='msds')


    def to_dict(self):
        return {
            'id': self.id,
            'mat_id': self.mat_id,
            'msds_link': self.msds_link,
        }