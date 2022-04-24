import json
from flask import Blueprint, jsonify, request
from .auth_routes import token_required
from ..extensions import db
from ..models.user import Team, User

team_routes = Blueprint('teams', __name__)


#Get all teams route
@team_routes.route('')
@token_required
def all_teams(current_user):
    teams = current_user.teams
    return {'teams': [team.to_dict() for team in teams]}


#Create team route -- add functionality - can only create team if team lead
@team_routes.route('/', methods=['POST'])
@token_required
def create_team(current_user):

    #add logic to determine role
    if not current_user.team_lead:
        return jsonify({'message': 'You must be a team lead to create a team'})
    data = request.get_json()

    new_team = Team(team_lead_id=current_user.id, tower_id=data.tower_id, jobsite_id=data.jobsite_id, storagelocation_id=data.storagelocation_id)
    db.session.add(new_team)
    db.session.commit()
    


#Get team details route
@team_routes.route('/<int:teamId>')
@token_required
def get_Team(current_user, teamId):
    team = Team.query.get(int(teamId))
    return jsonify({'team': team.to_dict()})


#Delete team route - can only be done if team lead
@team_routes.route('/<int:teamId>', methods=['DELETE'])
@token_required
def delete_team(current_user, teamId):

    #add logic to determine role
    if not current_user.team_lead:
        return jsonify({'message': 'You must be a team lead to delete a team'})

    team = Team.query.get(int(teamId))
    db.session.delete(team)
    db.session.commit()

    return jsonify({'message': 'team deleted'})



@team_routes.route('/<int:teamId>', methods=['PUT'])
def edit_team(teamId):
    pass


#Join team route
@team_routes.route('/<int:teamId>', methods=['PATCH'])
@token_required
def join_team(current_user, teamId):
    user = User.query.get(current_user.id)
    team = Team.query.get(int(teamId))
    team.team_members.append(user)
    db.session.commit()    

    return jsonify({'message': 'Joined team'})

