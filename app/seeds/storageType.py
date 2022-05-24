from app.models import StorageType
from ..extensions import db



def seed_storage_type():
   
    Tower = StorageType(
            type='Tower')
    Connex = StorageType(
            type='Connex')

    
    db.session.add(Tower)
    db.session.add(Connex)
    
    db.session.commit()
