from app.models import Note
from ..extensions import db



def seed_notes():
   
    Note1 = Note(
            user_id=1, team_id=4, note_text='Grab fiberglass from connex')
    Note2 = Note(
            user_id=2, team_id=5, note_text='Grab BP-20 from connex')

    
    db.session.add(Note1)
    db.session.add(Note2)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()