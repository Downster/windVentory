from flaskproject.models import JobSite
from ..extensions import db


def seed_sites():
   
    Shiloh = JobSite(
        name="Shiloh",state ='CA', client = 'EDF')
    Sheldon = JobSite(
        name="Sheldon",state ='NY', client = 'EDF')
    Spurs1 = JobSite(
        name="Spinning Spurs",state ='CA', client = 'EDF')
    Cridge = JobSite(
        name="California Ridge",state ='CA', client = 'EDF')

    
    db.session.add(Shiloh)
    db.session.add(Sheldon)
    db.session.add(Spurs1)
    db.session.add(Cridge)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_sites():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()