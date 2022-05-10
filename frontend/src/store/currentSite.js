import { tokenFetch } from "./csrf";

const LOAD_JOBSITE = 'jobsite/LOAD_JOBSITE';


const loadJobsite = (jobsite) => ({
    type: LOAD_JOBSITE,
    jobsite
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

const initialState = {}

const currentSiteReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_JOBSITE:
            return newState[action.jobsite.id] = action.jobsite
        default:
            return state
    }
}

export default currentSiteReducer