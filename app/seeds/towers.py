from app.models import Tower
from ..extensions import db



def seed_towers():
    E26 = Tower(
            tower_number="E26", jobsite_id=1)
    F22 = Tower(
            tower_number="F22", jobsite_id=2)
    E22 = Tower(
            tower_number="E22", jobsite_id=1)

    
    db.session.add(E26)
    db.session.add(F22)
    db.session.add(E22)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()