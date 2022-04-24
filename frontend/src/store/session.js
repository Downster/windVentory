// frontend/src/store/session.js
import { tokenFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_USER = "session/UPDATE_USER";

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

const updateUser = (user) => ({
    type: UPDATE_USER,
    user,
});

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

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case UPDATE_USER:
            return { user: action.user };

        default:
            return state;
    }
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

export default sessionReducer;