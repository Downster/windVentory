from flaskproject.models import Note
from ..extensions import db


# Adds a demo user, you can add other users here if you want
def seed_notes():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    Note1 = Note(
            user_id=1, team_id=1, note_text='Grab fiberglass from connex')
    Note2 = Note(
            user_id=2, team_id=2, note_text='Grab BP-20 from connex')

    
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