import { tokenFetch } from "./csrf";

const LOAD_JOBSITE = 'currentSite/LOAD_JOBSITE';
const LOAD_INVENTORY = 'currentSite/LOAD_INVENTORY'
const ADD_MATERIAL = 'currentSite/ADD_MATERIAL'
const EDIT_MATERIAL = 'currentSite/EDIT_MATERIAL'
const DELETE_MATERIAL = 'currentSite/DELETE_MATERIAL'
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

const loadInventory = (materials) => ({
    type: LOAD_INVENTORY,
    materials
})

const addMaterial = (material) => ({
    type: ADD_MATERIAL,
    material
})

const editMaterial = (material) => ({
    type: EDIT_MATERIAL,
    material
})

const deleteMaterial = (matId) => ({
    type: DELETE_MATERIAL,
    matId
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

export const loadSiteInventory = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}/inventory`);
    const data = await res.json();
    if (res.ok) {
        dispatch(loadInventory(data.materials));
    } else {
        return data
    }
}

export const addMaterialToSite = (formData) => async (dispatch) => {
    const res = await tokenFetch(`/inventory`, {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(addMaterial(data));
    } else {
        return data
    }

}

export const editSiteMaterial = (materialId, formData) => async (dispatch) => {
    const res = await tokenFetch(`/inventory/${materialId}`, {
        method: 'PATCH',
        body: formData
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(editMaterial(data));
    } else {
        return data
    }

}

export const deleteSiteMaterial = (materialId) => async (dispatch) => {
    const res = await tokenFetch(`/inventory/${materialId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(deleteMaterial(data.matId));
    } else {
        return data
    }

}

const initialState = { site: null, currentWeather: null, forecast: null, teams: {}, inventory: {} }

const currentSiteReducer = (state = initialState, action) => {
    const newState = initialState;
    newState.site = { ...state.site }
    newState.currentWeather = { ...state.currentWeather }
    newState.forecast = { ...state.forecast }
    newState.teams = { ...state.teams }
    newState.inventory = { ...state.inventory }
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
        case ADD_MATERIAL:
            newState.inventory[action.material.id] = action.material
            return newState
        case LOAD_INVENTORY:
            if (action.materials) {
                action.materials.forEach(item => {
                    newState.inventory[item.id] = item;
                });
            }
            return newState
        case EDIT_MATERIAL:
            newState.inventory[action.material.id] = action.material
            return newState
        case DELETE_MATERIAL:
            delete newState.inventory[action.matId]
            return newState
        default:
            return state
    }
}

export default currentSiteReducer