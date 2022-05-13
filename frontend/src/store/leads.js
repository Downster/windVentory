import { tokenFetch } from "./csrf";

const GET_LEADS = 'leads/GET_LEADS'

const getLeads = (leads) => ({
    type: GET_LEADS,
    leads
});


export const loadLeads = () => async (dispatch) => {
    const res = await tokenFetch(`/users/leads`);

    if (res.ok) {
        const leads = await res.json();
        dispatch(getLeads(leads.leads))
        if (leads.errors) {
            return leads;
        };

    };
};

const initialState = {};

const leadsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_LEADS:
            if (action.leads) {
                action.leads.forEach(lead => {
                    newState[lead.id] = lead;
                });
            }
            return newState
        default:
            return state;

    }
}

export default leadsReducer