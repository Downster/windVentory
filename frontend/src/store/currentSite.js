import { tokenFetch } from "./csrf";

const LOAD_JOBSITE = 'currentSite/LOAD_JOBSITE';
const GET_TEAMS = 'currentSite/GET_TEAMS'
const GET_WEATHER = 'currentSite/GET_WEATHER'


const loadJobsite = (jobsite) => ({
    type: LOAD_JOBSITE,
    jobsite
});

const getTeams = (teams) => ({
    type: GET_TEAMS,
    teams,
});

const getWeather = (weather) => ({
    type: GET_WEATHER,
    weather
})

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

export const fetchWeather = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}/weather`);
    const weather = await res.json();
    if (res.ok) {
        dispatch(getWeather(weather))
    } else {
        return weather
    }
}

export const fetchTeams = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}/teams`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getTeams(data.currentTeams));
    } else {
        return data
    }
};

const initialState = { site: null, currentWeather: null, forecast: null, teams: {} }

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
        case GET_WEATHER:
            newState.currentWeather = action.weather
            return newState
        default:
            return state
    }
}

export default currentSiteReducer