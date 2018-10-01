import { handleRequest } from "../util";

export const loading = () => {
    return {
        type: "LOADING_QUAN_LY_TIN"
    }
}
export const fail = (err) => {
    return {
        type: 'FAIL_QUAN_LY_TIN',
        err
    }
};
export const success = (data) => {
    return {
        type: 'SUCCESS_QUAN_LY_TIN',
        data
    }
};
export const deleteProject = () => {
    return {
        type: 'DELETE'

    }
};
export const fetchMyProject = (axiosObj) => {
    return (dispatch) => {
        handleRequest(
            axiosObj,
            (data) => {
                dispatch(success(data))
            },
            (err) => {
                dispatch(fail(err))
            }
        )
    }
}
// http://api.cohober.vn/myproject
// Method: GET
// Header: {
// Authorization: "token của user"
// }
