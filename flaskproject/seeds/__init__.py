from flask.cli import AppGroup
from .connexs import seed_connex
from .notes import seed_notes
from .sites import seed_sites
from .teams import seed_teams
from .towers import seed_towers
from .events import seed_events
from .storageType import seed_storage_type
from .storageLocation import seed_storage_location
from .users import seed_users, undo_users


seed_commands = AppGroup('seed')



@seed_commands.command('all')
def seed():
    seed_storage_type()
    seed_storage_location()
    seed_users()
    seed_events()
    seed_teams()
    seed_towers()
    seed_sites()
    seed_connex()
    seed_notes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here