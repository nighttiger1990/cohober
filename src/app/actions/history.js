import {AsyncStorage} from 'react-native';

export const getDataSuccess = (data) => {
    return {
        type: 'FETCH_HISTORY_SUCCESS',
        data
    }
};
export const getDataDetail = (data) => {
    return {
        type: 'FETCH_DETAIL_HISTORY',
        data
    }
};
export const loading = () => {
    return {
        type: 'LOADING_HISTORY',
    }
};
export const getDataFail = () => {
    return {
        type: 'FETCH_HISTORY_FAILURE'
    }
};
export const getHistoryAsync = async (token) => {
    return await fetch('http://api.cohober.vn/api/histories?populate=project,user&limit=10', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then(async (response) => {
        return await response.json()
    }).then(async (res) => {
        return await res
    })
};
export const getHistory = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let token = await AsyncStorage.getItem('token');
            let history = await getHistoryAsync(token);
            if (history) {
                dispatch(getDataSuccess(history))
            }
        } catch (error) {
            console.log(error);
            dispatch(getDataFail())
        }
    }
};
export const getHistoryByIdAsync = async (id, token) => {
    return await fetch('http://api.cohober.vn/api/histories/' + id + "?populate=project,user", {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then(async (response) => {
        return await response.json()
    }).then(async (res) => {
        return await res
    })
};
export const getHistoryById = (id) => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem('token');
            let history = await getHistoryByIdAsync(id, token);
            if (history) {
                dispatch(getDataDetail(history))
            }
        } catch (error) {
            console.log(error)
        }
    }
};