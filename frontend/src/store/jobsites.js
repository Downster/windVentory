import { tokenFetch } from "./csrf";

const LOAD_JOBSITES = 'jobsites/LOAD_JOBSITES';
const CREATE_JOBSITE = 'jobsites/CREATE_JOBSITE';
const REMOVE_JOBSITE = 'jobsites/REMOVE_JOBSITE';
const EDIT_JOBSITE = 'jobsites/EDIT_JOBSITE';
const LEAVE_JOBSITE = 'jobsite/LEAVE_JOBSITE';


const loadJobsites = (jobsites) => ({
    type: LOAD_JOBSITES,
    jobsites
});

const create = (jobsite) => ({
    type: CREATE_JOBSITE,
    jobsite
});

const remove = (jobsite) => ({
    type: REMOVE_JOBSITE,
    jobsite
});

const edit = (jobsite) => ({
    type: EDIT_JOBSITE,
    jobsite
});



const leaveJobsite = (jobsite) => ({
    type: LEAVE_JOBSITE,
    jobsite
});

export const getJobsites = () => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        };
        console.log(data)
        dispatch(loadJobsites(data.Jobsites));
    };
};

export const createJobsite = (formData) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/`, {
        method: 'POST',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(create(data));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
};

export const deleteJobsite = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(remove(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
}

export const editJobsite = (formData, jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}`, {
        method: 'PATCH',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(edit(data.jobsite));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
};




export const leaveCurrentJobsite = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/groups/${jobsiteId}/leave`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobsite_id: jobsiteId })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(leaveJobsite(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
};


const updateSingleJobsite = (state, action) => {
    const newState = { ...state };
    newState[action.jobsite.id] = action.job
    return newState;
};

const initialState = {}

const jobsiteReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_JOBSITES: {
            action.jobsites.forEach(jobsite => {
                newState[jobsite.id] = jobsite;
            });
            return newState
        }
        case REMOVE_JOBSITE: {
            delete newState[action.jobsite.id];
            return newState;
        }
        case CREATE_JOBSITE:
            newState[action.jobsite.site.id] = action.jobsite.site
            return newState
        case EDIT_JOBSITE:
            newState[action.jobsite.id] = action.jobsite
            return newState
        case LEAVE_JOBSITE: {
            return updateSingleJobsite(state, action);
        }

        default:
            return state;
    };
};

export default jobsiteReducer;