from flask_socketio import emit, join_room, leave_room, send, SocketIO
from .extensions import db
from .models import Message


socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    #see what data is being sent to the backend
    emit('chat-global', data, broadcast=True)
    emit("chat", data, broadcast=True, to=room)


@socketio.on("delete")
def edit_chat(data):
    room = data['room']
    message = Message.query.get(data['msgId'])
    db.session.delete(message)
    db.session.commit()
    emit("delete", data, broadcast=True, to=room)

@socketio.on("edit")
def edit_chat(data):
    room = data['room']
    emit("edit", data, broadcast=True, to=room)



@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)



@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


@socketio.on('delete-room')
def on_delete(data):
    emit('delete-room', data, broadcast=True)

@socketio.on('sign-in')
def on_sign_in(data):
    emit('sign-in', data, broadcast=True)

@socketio.on('log-out')
def on_sign_in(data):
    print('dfffffffdfsghjklhgfdsfghjkl;jhgfddssghjkl;lkjhgfd')
    emit('log-out', data, broadcast=True)


@socketio.on('join_team_room')
def on_join_room(data):
    emit('join_team_room', data, broadcast=True)

@socketio.on('leave_team_room')
def on_leave_room(data):
    emit('leave_team_room', data, broadcast=True)

@socketio.on('join_site_room')
def on_join_site_room(data):
    emit('join_site_room', data, broadcast=True)

@socketio.on('leave_site_room')
def on_leave_site_room(data):
    emit('leave_site_room', data, broadcast=True)

@socketio.on('delete-room')
def delete_channel(data):
    emit('delete-channel', data, broadcast=True)

@socketio.on('create-site-room')
def create_channel(data):
    emit('create-site-room', data, broadcast=True)


@socketio.on('create-team-room')
def create_channel(data):
    emit('create-team-room', data, broadcast=True)