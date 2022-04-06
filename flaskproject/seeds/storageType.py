from flaskproject.models import StorageType
from ..extensions import db


# Adds a demo user, you can add other users here if you want
def seed_storage_type():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    Tower = StorageType(
            type='Tower')
    Connex = StorageType(
            type='Connex')

    
    db.session.add(Tower)
    db.session.add(Connex)
    
    db.session.commit()
