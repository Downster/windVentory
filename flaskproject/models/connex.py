from enum import unique
from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


#Connex model - Connex belongs to one jobsite and a jobsite has one connex
class Connex(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'), unique=True)
    chem_inventory = relationship('Chemical')
    mat_inventory = relationship('Material')
