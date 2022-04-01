from ..extensions import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

#Chemical Model- A chemical can belong to either a tower or a connex, and a tower or connex
#                   can have many chemicals

class Chemical(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    connex_inventory = db.Column(db.Integer, ForeignKey('connex.id'))
    tower_inventory = db.Column(db.Integer, ForeignKey('tower.id'))
    name = db.Column(db.String(50), nullable=False)
    details = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(10))