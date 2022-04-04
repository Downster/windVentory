from flaskproject.models import User
from ..extensions import db


# Adds a demo user, you can add other users here if you want
def seed_users():
    # image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/c203d7ca558d417b9aea8cd102ae32cf.jpg'
    brendan = User(
        email='imbrandan@gmail.com', first_name='Brendan', last_name='Downing', password='password', phone_number='408-916-6314', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    karis = User(
        email='kgardner@gmail.com', first_name='Karis', last_name='Gardner', password='password', phone_number='408-917-6314', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    tony = User (
        email='tromp@gmail.com', first_name='Tony', last_name='Trashman', password='password', phone_number='408-918-6314', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    mike = User (
        email='hotmike@gmail.com', first_name='Mike', last_name='Pandas', password='password', phone_number='408-919-6314', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    darren = User (
        email='dkrongus@gmail.com', first_name='Darren', last_name='kong', password='password', phone_number='408-901-6314', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    chris = User (
        email='cthreadgill@gmail.com', first_name='Chris', last_name='Threadgill', password='password', phone_number='508-761-2443', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    celeste = User (
        email='cwinterton@gmail.com', first_name='Celesta', last_name='Winterton', password='password', phone_number='615-744-3351', image='https://fionacapstonebucket.s3.us-west-1.amazonaws.com/defaults/09fb955ae10c4aff9708b4d6293fd1d8.png')
    

    
    db.session.add(brendan)
    db.session.add(karis)
    db.session.add(tony)
    db.session.add(mike)
    db.session.add(darren)
    db.session.add(chris)
    db.session.add(celeste)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()