// frontend/src/store/session.js
import { tokenFetch } from './csrf';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER';
const SET_JOBSITE = 'session/SET_JOBSITE'

const setUser = (user) => ({
    type: SET_USER,
    user,
});

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

export const restoreUser = () => async (dispatch) => {
    const response = await tokenFetch('/auth/restore');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const login = (user) => async (dispatch) => {
    const { username, password } = user;
    const response = await tokenFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();
    localStorage.setItem('x-access-token', data.token)
    dispatch(setUser(data.user));
    return response;
};

export const setUserJobsite = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobsite_id: jobsiteId })
    });

    if (res.ok) {
        const jobsiteId = await res.json()
        console.log(jobsiteId)
        dispatch(setJobsite(jobsiteId))
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
    localStorage.setItem('x-access-token', data.token)
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await tokenFetch('/auth/logout', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    localStorage.removeItem('x-access-token')
    return response;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_USER:
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState.user = null;
            return newState;
        case UPDATE_USER:
            return newState.user = action.user
        case SET_JOBSITE:
            return newState.user.jobsite = action.user.jobsite_id
        default:
            return state;
    }
};


export default sessionReducer;