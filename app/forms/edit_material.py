from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length, ValidationError, NumberRange

from app.models import material
from ..models import Material
from sqlalchemy import func

def material_exists(form, field):
    # Checking if room name is already in use
    name = field.data
    material_id = form.data['material_id']
    currentMaterial = Material.query.get(material_id)
    material = Material.query.filter(func.lower(Material.name) == func.lower(name)).first()
    if material:
        if material != currentMaterial:
            raise ValidationError('Material already exists, please locate it and update it accordingly')
        else:
            pass

class EditMaterialForm(FlaskForm):
    class_id = IntegerField('class_id', validators=[DataRequired(message="You must provide a material class")])
    material_id = IntegerField('material_id')
    storage_id = IntegerField('storage_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(message="You must provide a material name"), Length(min=3, max=40, message="Material name must be between 3 and 40 characters."), material_exists])
    quantity = IntegerField('quantity', validators=[DataRequired(message="You must provide a quantity"), NumberRange(min=1, message="Quantity must be above zero")])
    image = FileField('image')