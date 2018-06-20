import {combineReducers} from 'redux';
import auth from './auth';
import project from './project';
import category from './category';
import user from './user';
import notification from './notification';
import history from './history';
import language from './language';
import functions from './functions';
import locations from './locations';
import AppNavigator from '../Navigator';

import {NavigationActions} from 'react-navigation';
import * as types from '../constants/ActionTypes'

const navigation = (state, action) => {
    const {type, routeName} = action;
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? state : AppNavigator.router.getStateForAction(action, state);
};
const appReducer = combineReducers({
    navigation,
    auth,
    project,
    category,
    user,
    history,
    notification,
    language,
    functions,
    locations
});
const rootReducer = (state, action) => {
    if (action.type === types.LOGGED_OUT) {
        state = undefined
    }
    return appReducer(state, action)
};
export default rootReducer;