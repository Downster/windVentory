from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Length

class EditMaterialForm(FlaskForm):
    class_id = IntegerField('class_id', validators=[DataRequired()])
    storage_id = IntegerField('storage_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    image = FileField('image')