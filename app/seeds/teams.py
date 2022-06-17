from app.models import Team, storageLocation
from ..extensions import db


# Adds a demo user, you can add other users here if you want
def seed_teams():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    Team1 = Team(
           jobsite_id= 1, lead_id=1, job_type='Fiberglass', storagelocation_id = 1)
    Team2 = Team(
           jobsite_id= 2, lead_id= 2, job_type='Fiberglass', storagelocation_id = 6)
    Team3 = Team(
           jobsite_id=1, lead_id= 4, job_type='Fiberglass', storagelocation_id = 3)
    Team4 = Team(
           jobsite_id=1, lead_id= 5, job_type='Fiberglass', storagelocation_id = 4)
    Team5 = Team(
           jobsite_id=2, lead_id= 6, job_type='Fiberglass', storagelocation_id = 7)




    
    db.session.add(Team1)
    db.session.add(Team2)
    db.session.add(Team3)
    db.session.add(Team4)
    db.session.add(Team5)
    
    db.session.commit()



def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()