const defaultState = {
    isLoading: false,
    info: null,
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOADING_USER":
            return {
                ...state,
                isLoading: true,
            };
        case 'DISMISS_LOADING':
            return {
                ...state,
                isLoading: false
            };
        case 'FETCH_USER_PROFILE': {
            return {
                ...state,
                isLoading: false,
                info: action.data
            }
        }
        default:
            return state;
    }
}