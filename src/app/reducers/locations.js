const defaultState = {
    region: {
        latitude: 21.004934,
        longitude: 105.7808754,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    },
    inputSearch: false,
    resultList: [],
    address: null

};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'FETCHING_CURRENT_ADDRESS':
            return {
                ...state,
                region: action.data

            };
        case 'SEARCH_RESULT_MODAL':
            return {
                ...state,
                inputSearch: action.data
            };
        case 'FETCH_LIST_SEARCH_RESULT':
            return {
                ...state,
                resultList: action.data
            };
        case'FETCH_ADDRESS_RESULT':
            return {
                ...state,
                region: action.data
            };
        default:
            return state;
    }
}