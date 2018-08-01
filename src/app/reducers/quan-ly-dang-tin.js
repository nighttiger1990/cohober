const initalState = {
    isLoading: false,
    isLoaded: false,
    data: null,
    err: null
}
export default function QuanLyDangTin(state = initalState, action) {

    switch (action.type) {
        case "LOADING_QUAN_LY_TIN":
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            }
        case 'SUCCESS_QUAN_LY_TIN':
            return {
                ...state,
                data: action.data,
                isLoading: false,
                isLoaded: true
            }
        case 'FAIL_QUAN_LY_TIN':
            return {
                ...state,
                err: action.err
            }
        default: return state

    }
}