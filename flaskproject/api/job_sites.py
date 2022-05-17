import json
from flask import Blueprint, jsonify, request
from ..models import Tower
from ..models import Note
from ..awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from .auth_routes import token_required
from ..models import JobSite, User
from ..extensions import db
from ..forms import CreateSiteForm

jobsite_routes = Blueprint('jobsites', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Turns validation errors into an error message for frontend
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

#base route for jobsites
@jobsite_routes.route('/')
@token_required
def sites(current_user):
    sites = JobSite.query.all()
    return {'Jobsites': [site.to_dict() for site in sites]}




#create jobsite
@jobsite_routes.route('/', methods=["POST"])
@token_required
def create_site(current_user):
    form = CreateSiteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image = form["image"].data
    if image:
        if not allowed_file(image.filename):
            return {"errors": "file type not allowed"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400
        url = upload["url"]
    else:
        url='https://windventory.s3.amazonaws.com/73e0e9c55dd04ba284e933cfa4d9c07a.png'
    if form.validate_on_submit():
        site = JobSite(
            name=form['siteName'].data,
            state = form['state'].data,
            client = form['client'].data,
            image=url, 
        )
        db.session.add(site)
        db.session.commit()
        return jsonify({
            'site': site.to_dict(),
        })
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#delete jobsite
@jobsite_routes.route('/<int:jobsite_id>', methods=['DELETE'])
@token_required
def delete_site(current_user, jobsite_id):
    jobsite = JobSite.query.filter_by(id = jobsite_id).one()
    db.session.delete(jobsite)
    db.session.commit()
    
    return jsonify({'id' : jobsite_id})


#edit jobsite
@jobsite_routes.route('/<int:jobsite_id>', methods=['PATCH'])
@token_required
def edit_site(current_user, jobsite_id):
    form = CreateSiteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image = form["image"].data
    if image:
        if not allowed_file(image.filename):
            return {"errors": "file type not allowed"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400
        url = upload["url"]
    else:
        url= 'https://windventory.s3.amazonaws.com/73e0e9c55dd04ba284e933cfa4d9c07a.png'
    
    if form.validate_on_submit():
        jobsite = JobSite.query.get(jobsite_id)
        jobsite.name = form['siteName'].data
        jobsite.state = form['state'].data
        jobsite.client = form['client'].data
        jobsite.image= url 
        db.session.commit()
        return jsonify({'jobsite' : jobsite.to_dict()})
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Search for specific jobsite
@jobsite_routes.route('/<int:jobsite_id>')
@token_required
def get_site(current_user, jobsite_id):
    site = JobSite.query.get(int(jobsite_id))
    return site.to_dict()



#Join a jobsite
@jobsite_routes.route('/<int:jobsite_id>/join', methods=["PATCH"])
@token_required
def join_site(current_user, jobsite_id):
    print('inside')
    user = User.query.get(current_user.id)
    user.jobsite_id = int(jobsite_id)

    db.session.commit()
    
    return jsonify({'id' : jobsite_id})


#Show teams at a jobsite
@jobsite_routes.route('/<int:jobsite_id>/teams')
@token_required
def get_site_teams(current_user, jobsite_id):
    jobsite = JobSite.query.get(int(jobsite_id))

    if not jobsite:
        return jsonify({'message': "Jobsite doesn't exist"})

    return jobsite.teams_to_dict()


#Show members at a jobsite
@jobsite_routes.route('/<int:jobsite_id>/members')
@token_required
def get_site_members(current_user, jobsite_id):
    users = User.query.filter_by(jobsite_id=jobsite_id).all()
    print(users)

    if not users:
        return jsonify({'message': "Jobsite doesn't have any users"})

    #return userdata here 


#Show towers at a jobsite
@jobsite_routes.route('/<int:jobsite_id>/towers')
@token_required
def get_site_towers(current_user, jobsite_id):
    towers = Tower.query.filter_by(jobsite_id=jobsite_id).all()
    print(towers)

    if not towers:
        return jsonify({'message': "Jobsite doesn't have any towers"})

    return ""


#Show jobsite notes
@jobsite_routes.route('/<int:jobsite_id>/notes')
@token_required
def get_site_notes(current_user, jobsite_id):
    notes = Note.query.filter_by(jobsite_id=jobsite_id).all()
    print(notes)

    if not notes:
        return jsonify({'message': "Notes don't exist fot this jobsite"})

    return ""