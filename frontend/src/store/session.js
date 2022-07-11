import { tokenFetch } from './csrf';

const SET_USER = 'session/SET_USER';
const SET_HOTEL = 'session/SET_HOTEL'
const REMOVE_HOTEL = 'session/REMOVE_HOTEL'
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER';
const SET_JOBSITE = 'session/SET_JOBSITE'
const LEAVE_JOBSITE = 'session/LEAVE_JOBSITE'
const SET_TEAM = 'session/SET_TEAM'
const LEAVE_TEAM = 'session/LEAVE_TEAM'
const FLIP_LOADING = 'session/FLIP_LOADING'

const setUser = (user) => ({
    type: SET_USER,
    user,
});

const setHotel = (hotel) => ({
    type: SET_HOTEL,
    hotel,
});

const removeHotel = () => ({
    type: REMOVE_HOTEL
});

export const flipLoading = () => ({
    type: FLIP_LOADING
})

const removeUser = () => ({
    type: REMOVE_USER,
});

const updateUser = (user) => ({
    type: UPDATE_USER,
    user,
});

const setJobsite = (jobsiteId) => ({
    type: SET_JOBSITE,
    jobsiteId
})

const leaveJobsite = (siteId) => ({
    type: LEAVE_JOBSITE,
    siteId
})

const setTeam = (team) => ({
    type: SET_TEAM,
    team
})

const leaveTeam = (team) => ({
    type: LEAVE_TEAM,
    team
})


export const restoreUser = () => async (dispatch) => {
    const res = await tokenFetch('/auth/restore');
    const data = await res.json();
    if (res.ok) {
        dispatch(setUser(data.user));
        return res;
    } else {
        localStorage.removeItem('x-access-token', data.token)
    }
};

export const login = (user) => async (dispatch) => {
    const { username, password } = user;
    const response = await tokenFetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('x-access-token', data.token)
        dispatch(setUser(data.user));
    } else {
        return data;

    }
};

export const setUserHotel = (id, position) => async (dispatch) => {
    const res = await tokenFetch(`/users/${id}/hotel`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hotel_latitude: position.lat, hotel_longitude: position.lng })
    });

    if (res.ok) {
        const hotel = await res.json()
        dispatch(setHotel(hotel))
    } else {
        const errors = res.json()
        return errors
    }

}

export const leaveHotel = (id) => async (dispatch) => {
    const res = await tokenFetch(`/users/${id}/hotel`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hotel_latitude: null, hotel_longitude: null })
    });

    const errors = await res.json()
    if (res.ok) {
        dispatch(removeHotel())
    } else {
        return errors
    }

}

export const setUserJobsite = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}/join`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobsite_id: jobsiteId })
    });

    if (res.ok) {
        const jobsiteId = await res.json()
        dispatch(setJobsite(jobsiteId))
    } else {
        const errors = res.json()
        return errors
    }

}

export const leaveUserJobsite = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}/leave`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobsite_id: jobsiteId })
    });

    if (res.ok) {
        const siteId = await res.json()
        dispatch(leaveJobsite(siteId))
    } else {
        const errors = res.json()
        return errors
    }

}

export const setUserTeam = (teamId) => async (dispatch) => {
    const res = await tokenFetch(`/teams/${teamId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_id: teamId })
    });

    if (res.ok) {
        const team = await res.json()
        dispatch(setTeam(team))
    } else {
        const errors = res.json()
        return errors
    }
}

export const leaveUserTeam = (teamId) => async (dispatch) => {
    const res = await tokenFetch(`/teams/${teamId}/leave`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_id: teamId })
    });

    if (res.ok) {
        const team = await res.json()
        dispatch(leaveTeam(team))
    } else {
        const errors = res.json()
        return errors
    }
}

export const updateUserImage = (formData, id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(updateUser(data));
    } else
        return {
            errors: ["Something went wrong, please try again"],
        };
};

export const signup = (formData) => async (dispatch) => {

    const response = await fetch("/auth/signup", {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('x-access-token', data.token)
        dispatch(setUser(data.user));

    } else {
        return data;
    }
};

export const logout = () => async (dispatch) => {
    const response = await tokenFetch('/auth/logout', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    localStorage.removeItem('x-access-token')
    return response;
};


const initialState = { user: null, loading: false };

const sessionReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_USER:
            newState.user = action.user;
            return newState;
        case SET_HOTEL:
            newState.user.hotel.lon = action.hotel.hotel_longitude
            newState.user.hotel.lat = action.hotel.hotel_latitude
            return newState
        case REMOVE_HOTEL:
            newState.user.hotel.lon = null
            newState.user.hotel.lat = null
            return newState
        case FLIP_LOADING:
            newState.loading = !newState.loading
            return newState
        case REMOVE_USER:
            newState.user = null;
            return newState;
        case UPDATE_USER:
            return newState.user = action.user
        case SET_JOBSITE:
            newState.user.jobsite_id = action.jobsiteId.id
            return newState
        case LEAVE_JOBSITE:
            newState.user.jobsite_id = null
            return newState
        case SET_TEAM:
            newState.user.teams = action.team.team
            return newState
        case LEAVE_TEAM:
            newState.user.teams = []
            return newState
        default:
            return state;
    }
};


export default sessionReducer;