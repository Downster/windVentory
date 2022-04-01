from ast import For
from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


#Tower model- tower has on jobsite, jobsite has multiple towers
class Tower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tower_number = db.Column(db.String(5), nullable=False)
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    chem_id = relationship('Chemical')
    mat_id = relationship("Material")
