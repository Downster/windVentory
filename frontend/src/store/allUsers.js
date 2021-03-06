import { tokenFetch } from "./csrf";

const GET_USERS = 'allUsers/GET_USERS'
const CREATE_USER = 'allUsers/CREATE_USERS'
const DELETE_USER = 'allUsers/DELETE_USERS'
const EDIT_USER = 'allUsers/EDIT_USER'

const getUsers = (users) => ({
    type: GET_USERS,
    users
});

const createUser = (user) => ({
    type: CREATE_USER,
    user
})

const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId
})

const editUser = (user) => ({
    type: EDIT_USER,
    user
})


export const loadAllUsers = () => async (dispatch) => {
    const res = await tokenFetch(`/users`);


    const users = await res.json();
    if (res.ok) {
        dispatch(getUsers(users.users));
    } else {
        return users;
    }
};


export const createNewUser = (formData) => async (dispatch) => {
    const res = await tokenFetch(`/users/new`, {
        method: 'POST',
        body: formData,
    });

    const user = await res.json();
    if (res.ok) {
        dispatch(createUser(user.user));
    } else {
        return user;
    }
};

export const removeUser = (userId) => async (dispatch) => {
    const res = await tokenFetch(`/users/${userId}`, {
        method: 'DELETE',
    });

    const user = await res.json();
    if (res.ok) {
        dispatch(deleteUser(user.userId));
    } else {
        return user;
    }
}

export const modifyUser = (formData, userId) => async (dispatch) => {
    const res = await tokenFetch(`/users/${userId}`, {
        method: 'PATCH',
        body: formData,
    });

    const user = await res.json();
    if (res.ok) {
        dispatch(editUser(user.user));
    } else {
        return user;
    }
}

const initialState = {};

const allUsersReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_USERS:
            if (action.users) {
                action.users.forEach(user => {
                    newState[user.id] = user;
                });
            }
            return newState
        case CREATE_USER:
            newState[action.user.id] = action.user
            return newState
        case DELETE_USER:
            delete newState[action.userId]
            return newState
        case EDIT_USER:
            newState[action.user.id] = action.user
            return newState
        default:
            return state;

    }
}

export default allUsersReducer