import { tokenFetch } from "./csrf";

const LOAD_JOBSITE = 'currentSite/LOAD_JOBSITE';
const GET_TEAMS = 'currentSite/GET_TEAMS'


const loadJobsite = (jobsite) => ({
    type: LOAD_JOBSITE,
    jobsite
});

const getTeams = (teams) => ({
    type: GET_TEAMS,
    teams,
});

export const loadUserJobsite = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        };
        dispatch(loadJobsite(data));
    };
};

export const fetchTeams = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}/teams`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getTeams(data.currentTeams));
    } else {
        return data
    }
};

const initialState = { site: null, weather: null, teams: {} }

const currentSiteReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_JOBSITE:
            newState.site = action.jobsite
            return newState
        case GET_TEAMS:
            if (action.teams) {
                action.teams.forEach(team => {
                    newState.teams[team.id] = team;
                });
            }
            return newState
        default:
            return state
    }
}

export default currentSiteReducer