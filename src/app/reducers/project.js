import reactotronReactNative from "reactotron-react-native";

const defaultState = {
    isLoading: false,
    isLoaded: false,
    data: null,
    nearby: null,
    project: null,
    isLoadingNear: true,
    isLoadedNear: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOADING_PROJECT":
            return {
                ...state,
                isLoading: true,
            };
        case "LOADING_PROJECT_NEAR":
            return {
                ...state,
                isLoadingNear: true,
                isLoadedNear: false
            };
        case 'FETCH_PROJECT_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data,
            };
        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                isLoading: false
            };
        case 'ADD_PROJECT_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isLoaded:true
            };
        case 'FETCH_NEARBY_DATA':
            return {
                ...state,
                isLoading: false,
                nearby: action.data,
                isLoadingNear: false,
                isLoadedNear: true
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