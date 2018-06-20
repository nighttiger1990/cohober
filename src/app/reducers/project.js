const defaultState = {
    isLoading: false,
    data: null,
    nearby: null,
    project: null
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOADING_PROJECT":
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_PROJECT_DATA_SUCCESS':
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
        case'ADD_PROJECT_SUCCESS':
            return {
                ...state,
                isLoading: false
            };
        case'FETCH_NEARBY_DATA':
            return {
                ...state,
                isLoading: false,
                nearby: action.data
            };
        case 'FETCH_PROJECT_DETAIL_SUCCESS':
            return {
                ...state,
                isLoading: false,
                project: action.data
            };
        default:
            return state;
    }
}