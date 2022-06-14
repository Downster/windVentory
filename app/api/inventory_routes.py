from flask import Blueprint, request, jsonify
from .auth_routes import token_required
from ..forms import MaterialForm, EditMaterialForm
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
    if form.validate_on_submit():
        if image:
            if not allowed_file(image.filename):
                return {"image_errors": "file type not allowed"}, 400
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            url = upload["url"]
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


@inventory_routes.route('/<int:matId>', methods=['PATCH'])
@token_required
def edit_inventory(current_user, matId):
    form = EditMaterialForm()
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
    if form.validate_on_submit():
        material = Material.query.get(matId)
        material.class_id = form.data['class_id']
        material.storage_id = form.data['storage_id']
        material.name = form.data['name']
        material.quantity = form.data['quantity']
        if image:
            material.image = url

        db.session.commit()
        return material.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401

@inventory_routes.route('/<int:matId>', methods=['DELETE'])
@token_required
def delete_inventory(current_user, matId):
    material = Material.query.get(matId)
    db.session.delete(material)
    db.session.commit()
    return jsonify({'matId': matId})
    



