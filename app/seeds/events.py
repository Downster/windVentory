from multiprocessing import Event
from app.models import Event
from datetime import date
from ..extensions import db



def seed_events():
   
    Event1 = Event(
            user_id=1, team_id=4, summary='Grab fiberglass from connex', description='Grab another roll of biax from the connex', start_time=date.today(), end_time=date.today())
    Event2 = Event(
            user_id=2, team_id=5, summary='Grab BP-20 from connex', description='Grab 5 tubes of bp-20 from the connex', start_time=date.today(), end_time=date.today())

    
    db.session.add(Event1)
    db.session.add(Event2)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()