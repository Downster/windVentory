from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class StorageLocation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    storagetype_id = db.Column(db.Integer, ForeignKey('storage_type.id'))
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    

    #relationships
    storage_type = relationship('StorageType', backref='type_storage')
    jobsite = relationship('JobSite', backref='jobsite_storage')


