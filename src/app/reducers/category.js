const defaultState = {
    isLoading: false,
    data: null,
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOADING_CATEGORY":
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_CATEGORIES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                isLoading: false
            };
        case'DISMISS_LOADING':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}