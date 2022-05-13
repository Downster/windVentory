import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import jobsiteReducer from './jobsites';
import currentSiteReducer from './currentSite';
import siteTeamsReducer from './siteTeams';
import allTeamsReducer from './allTeams';
import leadsReducer from './leads';
import currentTeamReducer from './currentTeam';

const rootReducer = combineReducers({
    session: sessionReducer,
    jobsites: jobsiteReducer,
    currentSite: currentSiteReducer,
    currentTeam: currentTeamReducer,
    siteTeams: siteTeamsReducer,
    allTeams: allTeamsReducer,
    leads: leadsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};



export default configureStore;