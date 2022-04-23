from flaskproject.models import User
from werkzeug.security import generate_password_hash
from ..extensions import db
import uuid


def seed_users():
   
    brendan = User(
        public_id=str(uuid.uuid4()), email='imbrandan@gmail.com', first_name='Brendan', last_name='Downing', password=generate_password_hash('password', method='sha256'), phone_number='408-916-6314')
    karis = User(
        public_id=str(uuid.uuid4()), email='kgardner@gmail.com', first_name='Karis', last_name='Gardner', password=generate_password_hash('password1234', method='sha256'), phone_number='408-917-6314')
    tony = User (
        public_id=str(uuid.uuid4()), email='tromp@gmail.com', first_name='Tony', last_name='Trashman', password=generate_password_hash('password2345', method='sha256'), phone_number='408-918-6314')
    mike = User (
        public_id=str(uuid.uuid4()), email='hotmike@gmail.com', first_name='Mike', last_name='Pandas', password=generate_password_hash('password345', method='sha256'), phone_number='408-919-6314')
    darren = User (
        public_id=str(uuid.uuid4()), email='dkrongus@gmail.com', first_name='Darren', last_name='kong', password=generate_password_hash('password456', method='sha256'), phone_number='408-901-6314')
    chris = User (
        public_id=str(uuid.uuid4()), email='cthreadgill@gmail.com', first_name='Chris', last_name='Threadgill', password=generate_password_hash('password567', method='sha256'), phone_number='508-761-2443')
    celeste = User (
        public_id=str(uuid.uuid4()), email='cwinterton@gmail.com', first_name='Celesta', last_name='Winterton', password=generate_password_hash('password678', method='sha256'), phone_number='615-744-3351')
    

    
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
    db.session.execute('TRUNCATE users RESET IDENTITY CASCADE;')
    db.session.commit()