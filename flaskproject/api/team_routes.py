from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user

from .auth_routes import token_required
from ..extensions import db
from ..models.user import Team, User, user_Teams

team_routes = Blueprint('teams', __name__)

@team_routes.route('/')
def users():
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}


@team_routes.route('/', methods=['POST'])
@token_required
def create_team(current_user):
    data = request.get_json()

    new_team = Team(team_lead_id=current_user.id, tower_id=data.tower_id, jobsite_id=data.jobsite_id, storagelocation_id=data.storagelocation_id)
    db.session.add(new_team)
    db.session.commit()
    


@team_routes.route('/<int:teamId>')
@token_required
def get_Team(current_user, teamId):
    team = Team.query.get(int(teamId))
    return {'team': team.to_dict()}



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
@token_required
def join_team(current_user, teamId):
    #get if they are a lead or not from the request
    user = User.query.get(current_user.id)
    team = Team.query.get(int(teamId))
    team.team_members.append(user)
    db.session.commit()    

    return jsonify({'message': 'Joined team'})




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