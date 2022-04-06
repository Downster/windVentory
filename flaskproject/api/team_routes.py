from flask import Blueprint
from flask_login import login_required, login_user

from ..extensions import db
from ..models.user import Team, User

team_routes = Blueprint('teams', __name__)

@team_routes.route('/')
def users():
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}


@team_routes.route('/', methods=['POST'])
def create_team():
    pass


@team_routes.route('/<int:teamId>')
def get_Team(teamId):
    pass



@team_routes.route('/<int:teamId>', methods=['DELETE'])
def delete_team(teamId):
    pass



@team_routes.route('/<int:teamId>', methods=['PUT'])
def edit_team(teamId):
    pass


@team_routes.route('/<int:teamId>/add', methods=['PATCH'])
def add_to_team(teamId):
    pass


@team_routes.route('/<int:teamId>', methods=['PATCH'])
def join_team(teamId):
    pass



@team_routes.route('/join', methods=['PATCH'])
def request_to_join_group():
    pass


@team_routes.route('/<int:teamId>/leave', methods=['PATCH'])
def leave_group(teamId):
    pass


@team_routes.route('/<int:teamId>/remove/<int:userId>', methods=['PATCH'])
def remove_from_team(groupId, userId):
    pass

@team_routes.route('/<int:teamId>/sites')
def get_sites(teamId):
    pass



@team_routes.route('/<int:teamId>/notes')
def get_notes(teamId):
    pass



@team_routes.route('/<int:teamId>/events')
def get_events(teamId):
    pass