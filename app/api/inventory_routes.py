from flask import Blueprint, request
from .auth_routes import token_required
from ..forms import MaterialForm
from ..models import Material
from ..extensions import db
from ..utils import form_validation_errors
from ..awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)
inventory_routes = Blueprint('inventory', __name__)

@inventory_routes.route('', methods=['POST'])
@token_required
def add_to_inventory(current_user):
    form = MaterialForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    image = form["image"].data
    if not allowed_file(image.filename):
        return {"errors": "file type not allowed"}, 400
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]
    if form.validate_on_submit():
        material = Material(
            class_id = form.data['class_id'],
            storage_id = form.data['storage_id'],
            name = form.data['name'],
            quantity = form.data['quantity'],
            image = url
        )
        db.session.add(material)
        db.session.commit()
        return material.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401




