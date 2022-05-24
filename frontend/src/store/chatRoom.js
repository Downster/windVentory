import { tokenFetch } from "./csrf";

const LOAD_SITE_ROOMS = 'chatRooms/LOAD_ROOMS';
const LOAD_ROOM = 'chatRooms/LOAD_ROOM';
const CREATE_TEAM_ROOM = 'chatRooms/CREATE_TEAM_ROOM';
const CREATE_SITE_ROOM = 'charRooms/CREATE_SITE_ROOM';
const DELETE_ROOM = 'chatRooms/DELETE_ROOM';
const EDIT_ROOM = 'chatRooms/EDIT_ROOM';
const JOIN_ROOM = 'chatRooms/JOIN_ROOM';
const LEAVE_ROOM = 'chatRooms/LEAVE_ROOM';

const loadSiteRooms = (rooms) => ({
    type: LOAD_SITE_ROOMS,
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

const createSiteRoom = (room) => ({
    type: CREATE_SITE_ROOM,
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

export const getSiteChatRooms = (siteId) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/site/${siteId}`);
    const rooms = await res.json();
    if (res.ok) {
        dispatch(loadSiteRooms(rooms.rooms))
    } else {
        return rooms
    }
};

export const getChatRoom = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}`);
    const room = await res.json();
    if (res.ok) {
        dispatch(loadRoom(room));
    } else {
        return room
    }
};

export const createTeamChatRoom = (formData) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/team`, {
        method: 'POST',
        body: formData
    });

    const room = await res.json();
    if (res.ok) {
        dispatch(createTeamRoom(room));
    } else {
        return room
    };
};

export const createSiteChatRoom = (formData) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/site`, {
        method: 'POST',
        body: formData
    });

    const room = await res.json();
    if (res.ok) {
        dispatch(createSiteRoom(room));
    } else {
        return room
    };
};

const initialState = {
    teamRooms: {},
    siteRooms: {}
};

const chatRoomsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_SITE_ROOMS:
            if (action.rooms.length) {
                action.rooms.forEach(room => {
                    newState.siteRooms[room.id] = room;
                });
            }
            return newState;

        case DELETE_ROOM: {
            delete newState.rooms[action.room.id];
            delete newState.byGroupId[action.room.group_id][action.room.id];
            return newState;
        }

        case LOAD_ROOM:
        case CREATE_TEAM_ROOM:
            newState.teamRooms[action.room.id] = action.room
            return newState
        case CREATE_SITE_ROOM:
            newState.siteRooms[action.room.id] = action.room
            return newState
        case EDIT_ROOM:
        case JOIN_ROOM:
        case LEAVE_ROOM:

        default:
            return state;
    };
};

export default chatRoomsReducer;