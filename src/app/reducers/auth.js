import * as types from '../constants/ActionTypes'

const defaultState = {
    isLoading: false,
    user: null,
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                isLoading: true
            };
        case types.LOGGED_IN:
            return {
                ...state,
                isLoading: false,
                user: action.user
            };
        case types.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case types.LOGGED_OUT:
            return {
                ...state,
                isLoading: false
            };
        case 'DISMISS_LOADING':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}