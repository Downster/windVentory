from app.models import StorageType
from ..extensions import db



def seed_storage_type():
   
    Team = StorageType(
            type='Team')
    Connex = StorageType(
            type='Connex')

    
    db.session.add(Team)
    db.session.add(Connex)
    
    db.session.commit()
