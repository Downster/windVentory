import { tokenFetch } from "./csrf";

const LOAD_ROOMS = 'chatRooms/LOAD_ROOMS';
const LOAD_ROOM = 'chatRooms/LOAD_ROOM';
const CREATE_TEAM_ROOM = 'chatRooms/CREATE_TEAM_ROOM';
const DELETE_ROOM = 'chatRooms/DELETE_ROOM';
const EDIT_ROOM = 'chatRooms/EDIT_ROOM';
const JOIN_ROOM = 'chatRooms/JOIN_ROOM';
const LEAVE_ROOM = 'chatRooms/LEAVE_ROOM';

const loadRooms = (rooms) => ({
    type: LOAD_ROOMS,
    rooms
});

const loadRoom = (room) => ({
    type: LOAD_ROOM,
    room
});

const createTeamRoom = (room) => ({
    type: CREATE_TEAM_ROOM,
    room
});

const removeRoom = (room) => ({
    type: DELETE_ROOM,
    room
});

const editRoom = (room) => ({
    type: EDIT_ROOM,
    room
});

const joinRoom = (room) => ({
    type: JOIN_ROOM,
    room
});

const leaveRoom = (room) => ({
    type: LEAVE_ROOM,
    room
})

export const getChatRooms = (groupId) => async (dispatch) => {
    const res = await tokenFetch(`/api/groups/${groupId}/rooms`);
    const rooms = await res.json();
    if (res.ok) {
        dispatch(loadRooms(rooms.rooms))
    } else {
        return rooms
    }
};

export const getChatRoom = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}`);
    const room = await res.json();
    if (res.ok) {
        dispatch(loadRoom(data));
    } else {
        return room
    }
};

export const createTeamChatRoom = (room_name, team_id) => async (dispatch) => {
    const res = await tokenFetch(`/api/rooms/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room_name,
            team_id
        })
    });

    const room = await res.json();
    if (res.ok) {
        dispatch(createTeamRoom(room));
    } else {
        return room
    };
};

const initialState = {
    teamRooms: null,
    siteRooms: null
};

const chatRoomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ROOMS: {
            const newState = { ...state }
            const loadRooms = {};
            action.rooms.forEach(room => {
                loadRooms[room.id] = room;
            });
            newState.rooms = { ...loadRooms };
            if (action.rooms.length) {
                newState.byGroupId[action.rooms[0].group_id] = { ...loadRooms }
            }
            return newState;
        }

        case DELETE_ROOM: {
            const newState = { ...state };
            delete newState.rooms[action.room.id];
            delete newState.byGroupId[action.room.group_id][action.room.id];
            return newState;
        }

        case LOAD_ROOM:
        case CREATE_TEAM_ROOM:
        case EDIT_ROOM:
        case JOIN_ROOM:
        case LEAVE_ROOM: {
            return updateSingleRoom(state, action);
        }

        default:
            return state;
    };
};

export default chatRoomsReducer;