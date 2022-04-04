from flaskproject.models import Tower
from ..extensions import db


# Adds a demo user, you can add other users here if you want
def seed_towers():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    E26 = Tower(
            tower_number="E26", jobsite_id=1)
    F22 = Tower(
            tower_number="F22", jobsite_id=2)

    
    db.session.add(E26)
    db.session.add(F22)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()