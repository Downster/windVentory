import { async } from "regenerator-runtime";
import { tokenFetch } from "./csrf";

const GET_USERS = 'allUsers/GET_USERS'
const CREATE_USER = 'allUsers/CREATE_USERS'
const DELETE_USER = 'allUsers/DELETE_USERS'

const getUsers = (users) => ({
    type: GET_USERS,
    users
});

const createTeam = (user) => ({
    type: CREATE_USER,
    user
})

const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId
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


// export const createNewTeam = (formData) => async (dispatch) => {
//     const res = await tokenFetch(`/teams/`, {
//         method: 'POST',
//         body: formData,
//     });

//     const team = await res.json();
//     if (res.ok) {
//         dispatch(createTeam(team.team));
//     } else {
//         return team;
//     }
// };

// export const removeTeam = (teamId) => async (dispatch) => {
//     const res = await tokenFetch(`/teams/${teamId}`, {
//         method: 'DELETE',
//     });

//     const team = await res.json();
//     if (res.ok) {
//         dispatch(deleteTeam(team.team));
//     } else {
//         return team;
//     }
// }

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

        case DELETE_USER:
        default:
            return state;

    }
}

export default allUsersReducer