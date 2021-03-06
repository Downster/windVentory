from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


#Tower model- tower has on jobsite, jobsite has multiple towers
class Tower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tower_number = db.Column(db.String(5), nullable=False)
    jobsite_id = db.Column(db.Integer, ForeignKey('job_site.id'))
    storagelocation_id = db.Column(db.Integer, ForeignKey('storage_location.id'))

    #relationshiops
    jobsite = relationship('JobSite', back_populates='towers')
    storage_location = relationship('StorageLocation', backref='location')


    def to_dict(self):
        return {
            'id': self.id,
            'towerNumber': self.tower_number,
            'jobsite_id' : self.jobsite_id,
            'storagelocation_id' : self.storagelocation_id,

    }

    def jobsite_to_dict(self):
        return {
            'jobsite' : [site.to_dict() for site in self.jobsite]
        }