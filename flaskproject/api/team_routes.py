import json
from flask import Blueprint, jsonify, request
from .auth_routes import token_required
from ..extensions import db
from ..models.user import Team, User
from ..forms import CreateTeamForm

team_routes = Blueprint('teams', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Turns validation errors into an error message for frontend
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


#Get all teams route
@team_routes.route('/')
@token_required
def all_teams(current_user):
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}


#Create team route -- add functionality - can only create team if team lead
@team_routes.route('/', methods=['POST'])
@token_required
def create_team(current_user):
    form  = CreateTeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    #add logic to determine role
    if current_user.to_role() == {'Admin'} or current_user.to_role() =={'Lead'} or current_user.to_role() == {'Supervisor'}:
        if form.validate_on_submit():
            team = Team (
                lead_id=form['lead_id'].data,
                jobsite_id = form['jobsite_id'].data,
                job_type = form['job_type'].data,
            )
            db.session.add(team)
            db.session.commit()
            return jsonify({
                'team': team.to_dict(),
            })
    else :
        return {"errors": "Unauthorized"}, 401
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    


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

    if current_user.to_role() == {'Admin'} or current_user.to_role() =={'Lead'} or current_user.to_role() == {'Supervisor'}:
        team = Team.query.get(int(teamId))
        db.session.delete(team)
        db.session.commit()
        return jsonify({'team': teamId})
    else:
        return {"errors": "Unauthorized"}, 401



@team_routes.route('/<int:teamId>', methods=['PUT'])
@token_required
def edit_team(current_user, teamId):
    form = CreateTeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.to_role() == {'Admin'} or current_user.to_role() =={'Lead'} or current_user.to_role() == {'Supervisor'}:
        if form.validate_on_submit():
            team = Team.query.get(teamId)
            team.lead_id=form.data['lead_id']
            team.jobsite_id = form.data['jobsite_id']
            team.job_type = form.data['job_type']
            db.session.commit()
            return jsonify({
                'team': team.to_dict(),
            })
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



#Join team route
@team_routes.route('/<int:teamId>', methods=['PATCH'])
@token_required
def join_team(current_user, teamId):
    
    user = User.query.get(current_user.id)
    team = Team.query.get(int(teamId))
    team.team_members.append(user)
    db.session.commit()    

    return jsonify({'team': team.to_dict()})

