const SET_TEAM = 'currentTeam/SET_TEAM'
const GET_TEAM = 'currentTeam/GET_TEAM'

export const setTeam = (team) => ({
    type: SET_TEAM,
    team
})

const getTeam = (team) => ({
    type: GET_TEAM,
    team
})

export const fetchUserTeam = (user) => async (dispatch) => {
    if (user.teams[0]) {
        dispatch(getTeam(user.teams[0]))
    }
}







const initialState = { team: null }

const currentTeamReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case SET_TEAM:
            newState.team = action.team
            return newState
        case GET_TEAM:
            newState.team = action.team
            return newState
        default:
            return state
    }
}

export default currentTeamReducer