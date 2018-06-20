import {NavigationActions} from 'react-navigation';
import {AsyncStorage} from 'react-native'
import Toast from 'react-native-toast-native';

export const getDataSuccess = (data) => {
    return {
        type: 'FETCH_CATEGORIES_SUCCESS',
        data
    }
};

export const loading = () => {
    return {
        type: 'LOADING_CATEGORY',
    }
};
export const getDataFail = () => {
    return {
        type: 'FETCH_DATA_FAILURE'
    }
};
export const addSuccess = () => {
    return {
        type: 'DISMISS_LOADING'
    }
};
export const getCategoryAsync = async (token) => {
    return await fetch("https://api.cohober.vn/api/categories", {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(async (response) => {
        return await response.json()
    }).then(async (res) => {
        return await res
    })
};

export const getCategories = () => {
    return async (dispatch) => {
        try {
            const categories = [];
            let token = await AsyncStorage.getItem('token');
            let category = await getCategoryAsync(token);
            let c;
            for (c of category) {
                categories.push({key: c.id, name: c.name})
            }
            Promise.all(categories).then(() => {
                dispatch(getDataSuccess(categories))
            })

        } catch (error) {
            dispatch(getDataFail());
            console.log(error)
        }

    }
};
export const getCategoryByIdAsync = async (id, token) => {
    return await fetch("https://api.cohober.vn/api/categories/" + id, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(async (response) => {
        return await response.json()
    }).then(async (res) => {
        return await res
    })
};
export const getCategoryById = (id) => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem('token');
            let category = await getCategoryByIdAsync(id, token);
            console.log(category)

        } catch (error) {
            dispatch(getDataFail());
            console.log(error)
        }

    }
};
export const createCategoryAsync = async (data, token) => {

    return await fetch('https://api.cohober.vn/api/categories', {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: JSON.stringify({
            "name": data.name,

        })
    }).then(async (response) => {
        return await response.json();
    }).then(async (res) => {
        return await res
    })
};
export const createCategory = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let {name = ''} = data;
            if (name.trim() != null && name.trim() !== "" && name.trim() !== undefined) {
                let token = await AsyncStorage.getItem('token');
                let categories = await createCategoryAsync(data, token);
                let lang = await  AsyncStorage.getItem('lang');
                if (categories.id) {
                    dispatch(getCategories());
                    dispatch(NavigationActions.back());
                    dispatch(addSuccess());
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
                    dispatch(getDataFail());
                    try {
                        let message = '';
                        for (category of categories) {
                            message += category.msg
                        }
                        Toast.show(message + " ", Toast.SHORT, Toast.TOP, {
                            height: 50,
                            width: 400,
                            backgroundColor: '#ffca00',
                            opacity: 0.5,
                            textAlign: 'center',
                            lines: 1,
                            borderRadius: 3
                        });
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
};