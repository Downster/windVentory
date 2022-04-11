from flask import Blueprint, jsonify, request

from ..models import Tower
from ..models import Note
from .auth_routes import token_required
from ..models import JobSite, User
from ..extensions import db

jobsite_routes = Blueprint('jobsites', __name__)

@jobsite_routes.route('')
@token_required
def sites(current_user):
    sites = JobSite.query.all()
    return {'Jobsites': [site.to_dict() for site in sites]}



@jobsite_routes.route('/<int:jobsite_id>')
@token_required
def get_site(current_user, jobsite_id):
    site = JobSite.query.get(int(jobsite_id))
    return site.to_dict()



@jobsite_routes.route('/<int:jobsite_id>', methods=["PATCH"])
@token_required
def join_site(current_user, jobsite_id):
    user = User.query.get(current_user.id)
    user.jobsite_id = int(jobsite_id)

    db.session.commit()
    
    return jsonify({'message': "Jobsite Joined"})


@jobsite_routes.route('/<int:jobsite_id>/teams')
@token_required
def get_site_teams(current_user, jobsite_id):
    jobsite = JobSite.query.get(int(jobsite_id))

    if not jobsite:
        return jsonify({'message': "Jobsite doesn't exist"})

    return jobsite.teams_to_dict()


@jobsite_routes.route('/<int:jobsite_id>/members')
@token_required
def get_site_members(current_user, jobsite_id):
    users = User.query.filter_by(jobsite_id=jobsite_id).all()
    print(users)

    if not users:
        return jsonify({'message': "Jobsite doesn't exist"})

    #return userdata here 

@jobsite_routes.route('/<int:jobsite_id>/towers')
@token_required
def get_site_towers(current_user, jobsite_id):
    towers = Tower.query.filter_by(jobsite_id=jobsite_id).all()
    print(towers)

    if not towers:
        return jsonify({'message': "Jobsite doesn't exist"})

    return ""

@jobsite_routes.route('/<int:jobsite_id>/notes')
@token_required
def get_site_notes(current_user, jobsite_id):
    notes = Note.query.filter_by(jobsite_id=jobsite_id).all()
    print(notes)

    if not notes:
        return jsonify({'message': "Notes don't exist fot this jobsite"})

    return ""