from ..extensions import db
from sqlalchemy import ForeignKey


#Material model - Material belongs to one connex or one tower, towers or connex's can have many 
#                   materials
class Material(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    connex_inventory = db.Column(db.Integer, ForeignKey('connex.id'))
    tower_inventory = db.Column(db.Integer, ForeignKey('tower.id'))
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(50))