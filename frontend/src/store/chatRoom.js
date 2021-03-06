import { tokenFetch } from "./csrf";

const LOAD_SITE_ROOMS = 'chatRooms/LOAD_SITE_ROOMS';
const LOAD_TEAM_ROOMS = 'chatRooms/LOAD_TEAM_ROOMS';
const CREATE_TEAM_ROOM = 'chatRooms/CREATE_TEAM_ROOM';
const CREATE_SITE_ROOM = 'chatRooms/CREATE_SITE_ROOM';
const DELETE_SITE_ROOM = 'chatRooms/DELETE_ROOM';
const DELETE_TEAM_ROOM = 'chatRooms/DELETE_TEAM_ROOM';
const CLEAR_ROOMS = 'chatRooms/CLEAR_ROOMS'
const CLEAR_TEAM_ROOMS = 'chatRooms/CLEAR_TEAM_ROOMS'
const EDIT_SITE_ROOM = 'chatRooms/EDIT_ROOM';
const EDIT_TEAM_ROOM = 'chatRooms/EDIT_TEAM_ROOM'
const JOIN_SITE_ROOM = 'chatRooms/JOIN_ROOM';
const LEAVE_SITE_ROOM = 'chatRooms/LEAVE_ROOM';
const JOIN_TEAM_ROOM = 'chatRooms/JOIN_TEAM_ROOM';
const LEAVE_TEAM_ROOM = 'chatRooms/LEAVE_TEAM_ROOM';

const loadSiteRooms = (rooms) => ({
    type: LOAD_SITE_ROOMS,
    rooms
});

const loadTeamRoom = (rooms) => ({
    type: LOAD_TEAM_ROOMS,
    rooms
});

const createTeamRoom = (room) => ({
    type: CREATE_TEAM_ROOM,
    room
});

const createSiteRoom = (room) => ({
    type: CREATE_SITE_ROOM,
    room
});

const removeSiteRoom = (roomId) => ({
    type: DELETE_SITE_ROOM,
    roomId
});

const removeTeamRoom = (roomId) => ({
    type: DELETE_TEAM_ROOM,
    roomId
});

const editSiteRoom = (room) => ({
    type: EDIT_SITE_ROOM,
    room
});

const editTeamRoom = (room) => ({
    type: EDIT_TEAM_ROOM,
    room
});

const joinSiteRoom = (room) => ({
    type: JOIN_SITE_ROOM,
    room
});

const leaveSiteRoom = (room) => ({
    type: LEAVE_SITE_ROOM,
    room
})

const joinTeamRoom = (room) => ({
    type: JOIN_TEAM_ROOM,
    room
});

const leaveTeamRoom = (room) => ({
    type: LEAVE_TEAM_ROOM,
    room
})

export const clearRooms = () => ({
    type: CLEAR_ROOMS
})

export const clearTeamRooms = () => ({
    type: CLEAR_TEAM_ROOMS
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

export const getTeamChatRoom = (teamId) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/team/${teamId}`);
    const rooms = await res.json();
    if (res.ok) {
        dispatch(loadTeamRoom(rooms.rooms));
    } else {
        return rooms
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

export const joinChatRoom = (roomId, type) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/${roomId}/join`, {
        method: 'PATCH',
        body: {}
    });

    const room = await res.json();
    if (res.ok) {
        if (type === 'site') {
            dispatch(joinSiteRoom(room))
        } else {
            dispatch(joinTeamRoom(room))
        }
    } else {
        return room
    }
}

export const leaveChatRoom = (roomId, type) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/${roomId}/leave`, {
        method: 'PATCH'
    });

    const room = await res.json();
    if (res.ok) {
        if (type === 'site') {
            dispatch(leaveSiteRoom(room))
        } else {
            dispatch(leaveTeamRoom(room))
        }
    } else {
        return room
    }

}

export const editRoom = (roomId, formData, type) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/${type}/${roomId}`, {
        method: 'PATCH',
        body: formData
    });

    const room = await res.json();
    if (res.ok) {
        if (type === 'site') {
            dispatch(editSiteRoom(room))
        } else {
            dispatch(editTeamRoom(room))
        }
    } else {
        return room
    }

}

export const deleteChatRoom = (roomId, type) => async (dispatch) => {
    const res = await tokenFetch(`/rooms/${roomId}`, {
        method: 'DELETE'
    });

    const room = await res.json();
    if (res.ok) {
        if (type === 'site') {
            dispatch(removeSiteRoom(room.roomId))
        } else {
            dispatch(removeTeamRoom(room.roomId))
        }
    } else {
        return room
    }
}

const initialState = {
    teamRooms: {},
    siteRooms: {}
};

const chatRoomsReducer = (state = initialState, action) => {
    const newState = { teamRooms: {}, siteRooms: {} }
    newState.teamRooms = { ...state.teamRooms }
    newState.siteRooms = { ...state.siteRooms }
    switch (action.type) {
        case LOAD_SITE_ROOMS:
            if (action.rooms.length) {
                action.rooms.forEach(room => {
                    newState.siteRooms[room.id] = room;
                });
            }
            return newState;

        case CLEAR_ROOMS:
            const clearedState = { teamRooms: {}, siteRooms: {} }
            return clearedState
        case CLEAR_TEAM_ROOMS:
            newState.teamRooms = {}
            return newState
        case DELETE_SITE_ROOM: {
            delete newState.siteRooms[action.roomId];
            return newState;
        }
        case DELETE_TEAM_ROOM: {
            delete newState.teamRooms[action.roomId];
            return newState;
        }
        case EDIT_SITE_ROOM: {
            newState.siteRooms[action.room.id] = action.room
            return newState
        }
        case EDIT_TEAM_ROOM: {
            newState.teamRooms[action.room.id] = action.room
            return newState
        }

        case LOAD_TEAM_ROOMS:
            if (action.rooms.length) {
                action.rooms.forEach(room => {
                    newState.teamRooms[room.id] = room;
                });
            }
            return newState;

        case CREATE_TEAM_ROOM:
            newState.teamRooms[action.room.id] = action.room
            return newState
        case CREATE_SITE_ROOM:
            newState.siteRooms[action.room.id] = action.room
            return newState
        case JOIN_SITE_ROOM:
            newState.siteRooms[action.room.id] = action.room
            return newState
        case LEAVE_SITE_ROOM:
            newState.siteRooms[action.room.id] = action.room
            return newState
        case JOIN_TEAM_ROOM:
            newState.teamRooms[action.room.id] = action.room
            return newState
        case LEAVE_TEAM_ROOM:
            newState.teamRooms[action.room.id] = action.room
            return newState
        default:
            return state;
    };
};

export default chatRoomsReducer;