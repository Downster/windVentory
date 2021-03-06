import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import jobsiteReducer from './jobsites';
import currentSiteReducer from './currentSite';
import allTeamsReducer from './allTeams';
import leadsReducer from './leads';
import currentTeamReducer from './currentTeam';
import allUsersReducer from './allUsers';
import chatRoomsReducer from './chatRoom';
import messagesReducer from './messages';

const rootReducer = combineReducers({
    session: sessionReducer,
    jobsites: jobsiteReducer,
    currentSite: currentSiteReducer,
    currentTeam: currentTeamReducer,
    allTeams: allTeamsReducer,
    leads: leadsReducer,
    allUsers: allUsersReducer,
    chatRooms: chatRoomsReducer,
    messages: messagesReducer
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