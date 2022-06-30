from app.models import User, Role
from werkzeug.security import generate_password_hash
from ..extensions import db


def seed_users():
    Worker = Role(name='Worker')
    Lead = Role(name='Lead')
    Supervisor = Role(name='Supervisor')
    Admin = Role(name='Admin')

    brendan = User(
        email='imbrandan@gmail.com', first_name='Brendan', last_name='Downing', password=generate_password_hash('password', method='sha256'), phone_number='408-916-6314', roles=[Supervisor])
    karis = User(
        email='kgardner@gmail.com', first_name='Karis', last_name='Gardner', password=generate_password_hash('password1234', method='sha256'), phone_number='408-917-6314', roles=[Supervisor])
    tony = User (
        email='tromp@gmail.com', first_name='Tony', last_name='Trashman', password=generate_password_hash('password2345', method='sha256'), phone_number='408-918-6314')
    mike = User (
        email='hotmike@gmail.com', first_name='Mike', last_name='Pandas', password=generate_password_hash('password345', method='sha256'), phone_number='408-919-6314')
    admin = User (
        email='admin@admin.com', first_name='Admin', last_name='Joe', password=generate_password_hash('password', method='sha256'), phone_number='666-666-6666', roles=[Admin])
    demo = User (
        email='demo@demo.com', first_name='Demo', last_name='Dan', password=generate_password_hash('password', method='sha256'), jobsite_id=1, phone_number='666-666-6666', roles=[Admin])
    

    db.session.add(Worker)
    db.session.add(Lead)
    db.session.add(Supervisor)
    db.session.add(Admin)
    db.session.add(brendan)
    db.session.add(karis)
    db.session.add(tony)
    db.session.add(mike)
    db.session.add(admin)
    db.session.add(demo)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE user RESTART IDENTITY CASCADE;')
    db.session.commit()