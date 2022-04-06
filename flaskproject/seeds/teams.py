from flaskproject.models import Team
from ..extensions import db


# Adds a demo user, you can add other users here if you want
def seed_teams():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    Team1 = Team(
           jobsite_id= 1, lead_id=1, tower_id=1, job_type='Fiberglass')
    Team2 = Team(
           jobsite_id= 2, lead_id= 2, tower_id=2, job_type='Fiberglass')
    Team3 = Team(
           jobsite_id=1, lead_id= 4, tower_id=2, job_type='Fiberglass')
    Team4 = Team(
           jobsite_id=1, lead_id= 5, tower_id=3, job_type='Fiberglass')
    Team5 = Team(
           jobsite_id=2, lead_id= 6, tower_id=1, job_type='Fiberglass')




    
    db.session.add(Team1)
    db.session.add(Team2)
    db.session.add(Team3)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()