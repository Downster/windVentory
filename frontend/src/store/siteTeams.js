import { tokenFetch } from "./csrf";
const GET_TEAMS = 'siteTeams/GET_TEAMS'

const getTeams = (teams) => ({
    type: GET_TEAMS,
    teams,
});


export const fetchTeams = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}/teams`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getTeams(data.currentTeams));
    } else {
        return data
    }
};


const initialState = {};

const siteTeamsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_TEAMS:
            if (action.teams) {
                action.teams.forEach(team => {
                    newState[team.id] = team;
                });
            }
            return newState
        default:
            return state;

    }
}

export default siteTeamsReducer