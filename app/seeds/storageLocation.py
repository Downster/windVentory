from app.models import StorageLocation
from ..extensions import db


def seed_storage_location():
    #storageType_id = 1 === Tower 
    #storageType_id = 2 === Connex
    ShilohConnex = StorageLocation(
        storagetype_id=2, jobsite_id=1)
    SheldonConnex = StorageLocation(
        storagetype_id=2, jobsite_id=2)
    Spurs1Connex = StorageLocation(
        storagetype_id=2, jobsite_id=3
    )
    CridgeConnex = StorageLocation(
        storagetype_id=2, jobsite_id=4
    )
            

    

    db.session.add(ShilohConnex)
    db.session.add(SheldonConnex)
    db.session.add(Spurs1Connex)
    db.session.add(CridgeConnex)
    
    db.session.commit()

