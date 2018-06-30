import {AsyncStorage} from 'react-native';
import Toast from 'react-native-toast-native';

export const loading = () => {
    return {
        type: "LOADING_USER",
    }
};
export const dismissLoading = () => {
    return {
        type: 'DISMISS_LOADING'
    }
};
export const getProfileSuccess = (data) => {
    return {
        type: 'FETCH_USER_PROFILE',
        data
    }
};
export const getProfileAsync = async (token) => {
    return await fetch('http://api.cohober.vn/api/users/me', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(async (response) => {
            return await response.json();
        }).then(async (res) => {
            return await res
        })

};
export const getProfile = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let tokens = await AsyncStorage.getItem('token');
            let user = await getProfileAsync(tokens);
            if (user.id) {
                dispatch(getProfileSuccess(user))
            } else {
                dispatch(dismissLoading())
            }
        } catch (error) {
            console.log(error);
            dispatch(dismissLoading())
        }
    }
};
export const getProfileByIdAsync = async (id, token) => {
    return await fetch('http://api.cohober.vn/api/users/me/' + id, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(async (response) => {
            return await response.json();
        }).then(async (res) => {
            return await res
        })

};
export const getProfileById = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let tokens = await AsyncStorage.getItem('token');
            let user = await getProfileAsync(id, tokens);
            if (user.id) {
                dispatch(getProfileSuccess(user))
            } else {
                dispatch(dismissLoading())
            }
        } catch (error) {
            dispatch(dismissLoading())
        }
    }
};
export const updateProfileAsync = async (data, token) => {
    //console.log(JSON.stringify(data));
    return await fetch('http://api.cohober.vn/api/users/update', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            "name": data.name,
            "email": data.email,
            "phoneNumber": data.phoneNumber,
            "avatar": data.avatar
        })
    })
        .then(async (response) => {
            return await response.json();
        }).then(async (res) => {
            return await res
        })

};
export const updateProfile = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let lang = await AsyncStorage.getItem('lang');
            let tokens = await AsyncStorage.getItem('token');
            let user = await updateProfileAsync(data, tokens);

            if (user.id) {
                // dispatch(getProfileSuccess(user));
                dispatch(getProfile());
                // alert("Thành công")
                Toast.show(lang === 'vi' ? 'Thành công' : 'Success', Toast.SHORT, Toast.TOP, {
                    height: 50,
                    width: 400,
                    backgroundColor: '#ffca00',
                    opacity: 0.5,
                    textAlign: 'center',
                    lines: 1,
                    borderRadius: 3
                });

            } else {
                dispatch(dismissLoading())
            }
        } catch (error) {
            // console.log(error);
            dispatch(dismissLoading())
        }
    }
};