from ..extensions import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


#Job site model
class JobSite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    client = db.Column(db.String, nullable=False)
    image = db.Column(db.String(255), default='https://windventory.s3.amazonaws.com/73e0e9c55dd04ba284e933cfa4d9c07a.png')
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)


    #relationships
    towers = relationship('Tower', back_populates='jobsite')
    teams_site = relationship('Team', back_populates='team_jobsite', cascade='all, delete')
    users_site = relationship('User', back_populates='user_jobsite')
    site_connex = relationship('Connex', back_populates='jobsite')
    site_notes = relationship('Note', back_populates='jobsite')
    site_inventory = relationship('StorageLocation', back_populates='jobsite', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'state': self.state,
            'client': self.client,
            'image': self.image,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'currentTeams': [team.to_dict() for team in self.teams_site],
            'connex_id': [location.to_dict() for location in self.site_inventory if location.storagetype_id == 2]
        }

    def teams_to_dict(self):
        return {
            'currentTeams': [team.to_dict() for team in self.teams_site]
        }
    

