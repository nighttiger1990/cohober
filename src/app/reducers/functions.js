const defaultState = {
    type: 'idea'
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'idea':
            return {
                ...state,
                type: 'idea',

            };
        case 'raiseFunding':
            return {
                ...state,
                type: 'raiseFunding'
            };
        case 'realEstale':
            return {
                ...state,
                type: 'realEstale'
            };
        case 'docu':
            return {
                ...state,
                type: 'docu'
            }
        default:
            return state;
    }
}