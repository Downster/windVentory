import { tokenFetch } from "./csrf"

const SET_TEAM = 'currentTeam/SET_TEAM'
const LEAVE_TEAM = 'currentTeam/LEAVE_TEAM'
const GET_TEAM = 'currentTeam/GET_TEAM'
const LOAD_INVENTORY = 'currentTeam/LOAD_INVENTORY'
const ADD_MATERIAL = 'currentTeam/ADD_MATERIAL'
const EDIT_MATERIAL = 'currentTeam/EDIT_MATERIAL'
const DELETE_MATERIAL = 'currentTeam/DELETE_MATERIAL'

export const setTeam = (team) => ({
    type: SET_TEAM,
    team
})


export const leaveCurrentTeam = () => ({
    type: LEAVE_TEAM,
})

const getTeam = (team) => ({
    type: GET_TEAM,
    team
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

export const fetchUserTeam = (user) => async (dispatch) => {
    if (user.teams[0]) {
        dispatch(getTeam(user.teams[0]))
    }
}

export const loadTeamInventory = (locationId) => async (dispatch) => {
    const res = await tokenFetch(`/teams/${locationId}/inventory`);
    const data = await res.json();
    if (res.ok) {
        dispatch(loadInventory(data.materials));
    } else {
        return data
    }
}

export const addMaterialToTeam = (formData) => async (dispatch) => {
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

export const editTeamMaterial = (materialId, formData) => async (dispatch) => {
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

export const deleteTeamMaterial = (materialId) => async (dispatch) => {
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







const initialState = { team: null, inventory: null }

const currentTeamReducer = (state = initialState, action) => {
    const newState = { team: null, inventory: null }
    newState.team = { ...state.team }
    newState.inventory = { ...state.inventory }
    switch (action.type) {
        case SET_TEAM:
            newState.team = action.team
            return newState
        case GET_TEAM:
            newState.team = action.team
            return newState
        case LEAVE_TEAM:
            const clearState = { team: null, inventory: null }
            return clearState
        case LOAD_INVENTORY:
            if (action.materials) {
                action.materials.forEach(item => {
                    newState.inventory[item.id] = item;
                });
            }
            return newState
        case ADD_MATERIAL:
            newState.inventory[action.material.id] = action.material
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

export default currentTeamReducer