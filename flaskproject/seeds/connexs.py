from flaskproject.models import Connex
from ..extensions import db



def seed_connex():
   
    Connex1 = Connex(
            name="Spurs Connex", jobsite_id=3)
    Connex2 = Connex(
            name="Shiloh Connex", jobsite_id=1)

    
    db.session.add(Connex1)
    db.session.add(Connex2)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()