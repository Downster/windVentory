from flaskproject.models import Role
from ..extensions import db

# Adds a demo user, you can add other users here if you want
def seed_roles():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    Worker = Role(name='Worker')
    Lead = Role(name='Lead')
    Supervisor = Role(name='Supervisor')
    Admin = Role(name='Admin')





    
    db.session.add(Worker)
    db.session.add(Lead)
    db.session.add(Supervisor)
    db.session.add(Admin)
    
    db.session.commit()



def undo_roles():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()