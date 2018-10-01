import {AsyncStorage} from 'react-native'

export const getDataSuccess = (data) => {
    return {
        type: 'FETCH_NOTIFICATION_SUCCESS',
        data
    }
};

export const loading = () => {
    return {
        type: 'LOADING_NOTIFICATION',
    }
};
export const getDataFail = () => {
    return {
        type: 'FETCH_NOTIFICATION_FAILURE'
    }
};
export const getDetail = (data) => {
    return {
        type: 'FETCH_NOTIFICATION_DETAIL',
        data
    }
};
export const getNotificationAsync = async (token) => {
    return await fetch('http://api.cohober.vn/api/notifications?populate=project,user,fromUser&limit=10', {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        return await response.json()
    }).then(async (res) => {
        return await res
    })
};
export const getNotification = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let token = await AsyncStorage.getItem('token');
            let navigation = await getNotificationAsync(token);
            if (navigation) {
                dispatch(getDataSuccess(navigation))
            }
        } catch (error) {
            console.log(error);
            dispatch(getDataFail())
        }
    }
};
export const getNotificationByIdAsync = async (id, token) => {
    return await fetch('http://api.cohober.vn/api/notifications/' + id + "?populate=project,user,fromUser", {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        return await response.json()
    }).then(async (res) => {
        return await res
    })
};
export const getNotificationById = (id) => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem('token');
            let notifications = await getNotificationByIdAsync(id, token);
            if (notifications) {
                dispatch(getDetail(notifications))
            }
        } catch (error) {
            console.log(error)
        }
    }
};