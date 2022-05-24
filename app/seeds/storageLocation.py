from app.models import StorageLocation
from ..extensions import db


def seed_storage_location():
    #storageType_id = 1 === Tower 
    #storageType_id = 2 === Connex
    ShilohTower1 = StorageLocation(
        storagetype_id=1, jobsite_id=1)
    ShilohConnex = StorageLocation(
        storagetype_id=2, jobsite_id=1)
    ShilohTower2 = StorageLocation(
        storagetype_id=1, jobsite_id=2)
    ShilohTower3 = StorageLocation(
        storagetype_id=1, jobsite_id=1)
    SheldonConnex = StorageLocation(
        storagetype_id=2, jobsite_id=2)
    SheldonTower = StorageLocation(
        storagetype_id=1, jobsite_id=2)
    SheldonTower2 = StorageLocation(
        storagetype_id=1, jobsite_id=2)
            

    
    db.session.add(ShilohTower1)
    db.session.add(ShilohTower2)
    db.session.add(ShilohTower3)
    db.session.add(ShilohConnex)
    
    db.session.commit()

