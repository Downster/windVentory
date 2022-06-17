from app.models import StorageLocation
from ..extensions import db


def seed_storage_location():
    #storageType_id = 1 === Tower 
    #storageType_id = 2 === Connex
    ShilohTeam1 = StorageLocation(
        storagetype_id=1, jobsite_id=1)
    ShilohConnex = StorageLocation(
        storagetype_id=2, jobsite_id=1)
    ShilohTeam2 = StorageLocation(
        storagetype_id=1, jobsite_id=2)
    ShilohTeam3 = StorageLocation(
        storagetype_id=1, jobsite_id=1)
    SheldonConnex = StorageLocation(
        storagetype_id=2, jobsite_id=2)
    SheldonTeam = StorageLocation(
        storagetype_id=1, jobsite_id=2)
    SheldonTeam2 = StorageLocation(
        storagetype_id=1, jobsite_id=2)
            

    
    db.session.add(ShilohTeam1)
    db.session.add(ShilohConnex)
    db.session.add(ShilohTeam2)
    db.session.add(ShilohTeam3)
    db.session.add(SheldonConnex)
    db.session.add(SheldonTeam)
    db.session.add(SheldonTeam2)
    
    db.session.commit()

