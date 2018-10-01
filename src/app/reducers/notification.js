const defaultState = {
    isLoading: false,
    data: null,
    detail: null
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOADING_NOTIFICATION":
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_NOTIFICATION_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case 'FETCH_NOTIFICATION_DETAIL':
            return {
                ...state,
                detail: action.data
            };
        case 'FETCH_NOTIFICATION_FAILURE':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}