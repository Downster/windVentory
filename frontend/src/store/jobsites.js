import { tokenFetch } from "./csrf";

const LOAD_JOBSITES = 'jobsites/LOAD_JOBSITES';
const CREATE_JOBSITE = 'jobsites/CREATE_JOBSITE';
const REMOVE_JOBSITE = 'jobsites/REMOVE_JOBSITE';
const ADD_TO_JOBSITE = 'jobsites/ADD_TO_JOBSITE';
const EDIT_JOBSITE = 'jobsites/EDIT_JOBSITE';
const LOAD_JOBSITE = 'jobsite/LOAD_JOBSITE';
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

const addToJobsite = (jobsite) => ({
    type: ADD_TO_JOBSITE,
    jobsite
});


const loadJobsite = (jobsite) => ({
    type: LOAD_JOBSITE,
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

export const getJobsite = (jobsiteId) => async (dispatch) => {
    const res = await tokenFetch(`/jobsites/${jobsiteId}`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        };
        dispatch(loadJobsite(data));
    };
};

export const createJobsite = (formData) => async (dispatch) => {
    const res = await fetch(`/jobsites/`, {
        method: 'POST',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(create(data));
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

export const deleteJobsite = (jobsiteId) => async (dispatch) => {
    const res = await fetch(`/jobsites/${jobsiteId}`, {
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
    const res = await fetch(`/jobsites/${jobsiteId}`, {
        method: 'PUT',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(edit(data));
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

export const addUserToJobsite = (jobsiteId, email) => async (dispatch) => {
    const res = await fetch(`/jobsites/${jobsiteId}/add`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobsite_id: jobsiteId, email })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addToJobsite(data));
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



export const leaveCurrentJobsite = (jobsiteId) => async (dispatch) => {
    const res = await fetch(`/groups/${jobsiteId}/leave`, {
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

const initialState = {};

const jobsites = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_JOBSITES: {
            const loadJobsites = {};
            action.jobsites.forEach(jobsite => {
                loadJobsites[jobsite.id] = jobsite;
            });
            return {
                ...loadJobsites
            };
        }

        case REMOVE_JOBSITE: {
            const newState = { ...state };
            delete newState[action.jobsite.id];
            return newState;
        }


        case LOAD_JOBSITE:
        case CREATE_JOBSITE:
        case EDIT_JOBSITE:
        case ADD_TO_JOBSITE:
        case LEAVE_JOBSITE: {
            return updateSingleJobsite(state, action);
        }

        default:
            return state;
    };
};

export default jobsites;