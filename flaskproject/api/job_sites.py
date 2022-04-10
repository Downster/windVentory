from flask import Blueprint, request
from .auth_routes import token_required
from ..models import JobSite
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
    
    return current_user.to_dict()
