import { async } from "regenerator-runtime";
import { tokenFetch } from "./csrf";

const GET_TEAMS = 'allTeams/GET_TEAMS'
const CREATE_TEAM = 'allTeams/CREATE_TEAM'
const DELETE_TEAM = 'allTeams/DELETE_TEAM'
const EDIT_TEAM = 'allTeams/EDIT_TEAM'

const getTeams = (teams) => ({
    type: GET_TEAMS,
    teams
});

const createTeam = (team) => ({
    type: CREATE_TEAM,
    team
})

const deleteTeam = (teamId) => ({
    type: DELETE_TEAM,
    teamId
})

const editOneTeam = (team) => ({
    type: EDIT_TEAM,
    team
})


export const loadAllTeams = () => async (dispatch) => {
    const res = await tokenFetch(`/teams/`);


    const teams = await res.json();
    if (res.ok) {
        dispatch(getTeams(teams.teams));
    } else {
        return teams;
    }
};


export const createNewTeam = (formData) => async (dispatch) => {
    const res = await tokenFetch(`/teams/`, {
        method: 'POST',
        body: formData,
    });

    const team = await res.json();
    if (res.ok) {
        dispatch(createTeam(team.team));
        return team.team
    } else {
        return team;
    }
};

export const editTeam = (formData, teamId) => async (dispatch) => {
    const res = await tokenFetch(`/teams/${teamId}`, {
        method: 'PATCH',
        body: formData
    })

    const team = await res.json();
    if (res.ok) {
        dispatch(editOneTeam(team.team));
    } else {
        return team
    }
};

export const removeTeam = (teamId) => async (dispatch) => {
    const res = await tokenFetch(`/teams/${teamId}`, {
        method: 'DELETE',
    });

    const team = await res.json();
    if (res.ok) {
        dispatch(deleteTeam(team.team));
    } else {
        return team;
    }
}

const initialState = {};

const allTeamsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_TEAMS:
            if (action.teams) {
                action.teams.forEach(team => {
                    newState[team.id] = team;
                });
            }
            return newState
        case CREATE_TEAM:
            newState[action.team.id] = action.team
            return newState
        case EDIT_TEAM:
            newState[action.team.id] = action.team
            return newState
        case DELETE_TEAM:
            delete newState[action.teamId]
            return newState
        default:
            return state;

    }
}

export default allTeamsReducer