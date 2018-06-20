const defaultState = {
    isLoading: false,
    data: null,
    detail: null
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOADING_HISTORY":
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_HISTORY_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case 'FETCH_HISTORY_FAILURE':
            return {
                ...state,
                isLoading: false
            };
        case'FETCH_DETAIL_HISTORY':
            return {
                ...state,
                detail: action.data
            };
        default:
            return state;
    }
}