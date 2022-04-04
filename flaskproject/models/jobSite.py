from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from flask_login import UserMixin


#Job site model
class JobSite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    teams = db.Column(db.Integer, nullable=False)
    client = db.Column(db.String, nullable=False)

    #relationships
    # towers = relationship('Tower', back_populates='jobsite')
    # teams = relationship('Team', back_populates='team_jobsite')
    # site_connex = relationship('Connex', back_populates='jobsite')

