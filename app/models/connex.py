from enum import unique
from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


#Connex model - Connex belongs to one jobsite and a jobsite has one connex
class Connex(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'), unique=True)

    #relationships
    # chem_id = relationship('Chemical', back_populates="connex_chems")
    # mat_id = relationship('Material', back_populates="connex_mats")
    jobsite= relationship('JobSite', back_populates='site_connex')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'jobsite_id': self.jobsite_id,
        }
