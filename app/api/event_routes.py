from flask import Blueprint
from flask_login import login_required, login_user

from ..extensions import db
from ..models.user import User

event_routes = Blueprint('events', __name__)

@event_routes.route('/', methods=['POST'])
def create_event():
    pass


@event_routes.route('/<int:eventId>', methods=['DELETE'])
def delete_event(eventId):
    pass


@event_routes.route('/<int:eventId>', methods=['PUT'])
def edit_event(eventId):
    pass



@event_routes.route('/<int:eventId>', methods=['PATCH'])
def add_attendee(eventId):
    pass



@event_routes.route('/<int:eventId>/unattend', methods=['PATCH'])
def remove_attendee(eventId):
    pass