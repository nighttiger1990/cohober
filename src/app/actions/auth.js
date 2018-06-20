import * as types from '../constants/ActionTypes';
import {NavigationActions} from 'react-navigation';
import Toast from 'react-native-toast-native';
import {AsyncStorage, Platform} from 'react-native';
import validation from 'validate.js';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {getProfile} from './user';

const DeviceInfo = require('react-native-device-info');
const constraints = {
    email: {
        email: true,
        length: {
            minimum: 2,
            message: 'phải ít nhất 2 kí tự'
        },
        presence: {

            message: 'Vui lòng nhập lại email'
        },
        format: {
            pattern: '/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/ ',
            message: 'Email không hợp lệ'
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 6,
            // message: "must be at least 6 characters"
            message: " phải ít nhất 6 kí tự"
        }
    },
    confirmPassword: {
        equality: "password"
    },
    phone: {
        format: {
            pattern: "[0-9]+",

            // message: "can only contain 0-9"
            message: "chỉ có thể chứa kí tự 0-9"
        },
        length: {
            maximum: 12,
            minimum: 10
        }

    }
};

export const loginSuccess = (user) => {
    return {
        type: types.LOGGED_IN,
        user
    }
};
export const deviceInfo = () => {
    const device = {deviceId: '0', platform: 'web'};
    if (Platform.OS === 'ios') {
        device.deviceId = DeviceInfo.getUniqueID();
        device.platform = "IOS";
    } else {
        device.deviceId = DeviceInfo.getSerialNumber();
        device.platform = "android";
    }
    return device;
};
export const loading = () => {
    return {
        type: types.LOADING,
    }
};
export const loginFail = () => {
    return {
        type: types.FAILURE
    }
};
export const dismissLoading = () => {
    return {
        type: 'DISMISS_LOADING'
    }
};
export const logoutSuccess = () => {
    return {
        type: types.LOGGED_OUT
    }
};
export const signUpAsync = async (data) => {
    try {
        const device = deviceInfo();
        let lang = await AsyncStorage.getItem('lang');
        return await fetch('https://api.cohober.vn/api/users/registers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: lang ? JSON.stringify({
                "email": data.username,
                "password": data.password,
                "phoneNumber": data.phone + "",
                "name": data.name,
                "platform": device.platform,
                "deviceId": device.deviceId,
                "language": lang
            }) : JSON.stringify({
                "email": data.username,
                "password": data.password,
                "phoneNumber": data.phone + "",
                "name": data.name,
                "platform": device.platform,
                "deviceId": device.deviceId
            })
        })
            .then(async (response) => {
                return await response.json();
            }).then(async (res) => {
                return await res
            })
    } catch (error) {
        console.log(error)
    }

};
export const signInAsync = async (data) => {
    try {
        //  console.log(JSON.stringify(data))
        let lang = await AsyncStorage.getItem('lang');
        const device = deviceInfo();

        return await fetch('https://api.cohober.vn/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: lang ? JSON.stringify({
                'email': data.username,
                'password': data.password,
                'platform': device.platform,
                'deviceId': device.deviceId,
                'phoneNumber': data.phone,
                'name': data.name,
                'language': lang
            }) : JSON.stringify({
                'email': data.username,
                'password': data.password,
                'platform': device.platform,
                'deviceId': device.deviceId,
                'phoneNumber': data.phone,
                'name': data.name
            })
        }).then(async (response) => {
            return await response.json();
        }).then(async (res) => {
            return await res
        });

    } catch (error) {
        console.log(error)
    }

};
export const refreshTokenAsync = async (token) => {
    return await fetch("https://api.cohober.vn/api/users/token", {
        method: 'POST',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        return await response.json();
    }).then(async (res) => {
        return await res
    })
};
export const refeshToken = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let token = await AsyncStorage.getItem('token');
            // let lang = await AsyncStorage.getItem('lang');
            if (token) {
                try {
                    let tokens = await refreshTokenAsync(token);
                    if (tokens.token) {
                          console.log(tokens.token)
                        AsyncStorage.setItem("token", tokens.token);
                        dispatch(getProfile());
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Home'})
                            ]
                        });
                        dispatch(loginSuccess(tokens));

                        dispatch(resetAction);


                    } else {
                        dispatch(loginFail());

                    }

                } catch (error) {
                    console.log(error);
                    dispatch(loginFail());
                }

            } else {
                dispatch(loginFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(loginFail());
        }

    }
};
export const signIn = (data) => {
    return async (dispatch) => {
        try {
            console.log(JSON.stringify(data));

            let lang = await AsyncStorage.getItem('lang');
            if (data.password !== null && (data.password + "").length >= 6) {

                dispatch(loading());
                try {
                    //console.log(JSON.stringify(data));

                    let user = await signInAsync(data);
                    setTimeout(() => {
                        if (user.id) {

                            AsyncStorage.setItem('token', user.token);
                            dispatch(loginSuccess(user));
                            dispatch(getProfile());

                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName: 'Home'})
                                ]
                            });
                            dispatch(resetAction);
                        } else {
                            let m = "";
                            for (msg of user) {
                                m = m + msg.msg + "\n"
                            }

                            Toast.show('' + m, Toast.SHORT, Toast.TOP, {
                                height: 50,
                                width: 400,
                                backgroundColor: '#ffca00',
                                opacity: 0.5,
                                textAlign: 'center',
                                lines: 1,
                                borderRadius: 3
                            });
                            dispatch(loginFail());
                        }
                    }, 5000);

                    console.log(JSON.stringify(user))
                } catch (error) {
                    //  alert('Có lỗi xảy ra')
                    console.log(error);
                    dispatch(loginFail());
                }
            } else {
                Toast.show(lang === 'vi' ? "Mật khẩu phải 6 kí tự trở lên" : "Password must 6 character", Toast.SHORT, Toast.TOP, {
                    height: 50,
                    width: 400,
                    backgroundColor: '#ffca00',
                    opacity: 0.5,
                    textAlign: 'center',
                    lines: 1,
                    borderRadius: 3
                });
            }
        } catch (error) {
            console.log(error)
        }

    }
};

export const loginFBAsync = async (token) => {
    try {
        let lang = await AsyncStorage.getItem('lang');
        const device = deviceInfo();

        return await fetch("https://api.cohober.vn/api/users/loginWithFacebook", {
            method: 'POST',
            headers: {
                "Authorization": token,
                'Content-Type': 'application/json'
            },
            body: lang ? JSON.stringify({
                "facebookToken": token,
                "platform": device.platform,
                "deviceId": device.deviceId,
                "language": lang
            }) : JSON.stringify({
                "facebookToken": token,
                "platform": device.platform,
                "deviceId": device.deviceId
            })
        }).then(async (response) => {
            return await response.json();
        }).then(async (res) => {
            return await res
        }).catch(e => console.log(e + " "))

    } catch (error) {
        console.log(error)
    }

};
export const loginFB = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                // Toast.show('Không thành công',3000,Toast.TOP,{
                //     height:  50

                //    });
                dispatch(dismissLoading())
            } else {
                // console.log(JSON.stringify(result));
                try {
                    let data = await AccessToken.getCurrentAccessToken();
                    let token = data.accessToken.toString();
                    let user = await loginFBAsync(token);
                    if (user.id) {
                        AsyncStorage.setItem('token', user.token);
                        dispatch(getProfile());
                        dispatch(loginSuccess(user));
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Home'})
                            ]
                        });
                        dispatch(resetAction);
                    } else {
                        let m = "";
                        for (msg of user) {
                            m = m + msg.msg + "\n"
                        }

                        Toast.show('' + m, Toast.SHORT, Toast.TOP, {
                            height: 50,
                            width: 400,
                            backgroundColor: '#ffca00',
                            opacity: 0.5,
                            textAlign: 'center',
                            lines: 1,
                            borderRadius: 3
                        });
                        dispatch(loginFail());
                    }
                } catch (error) {

                    Toast.show('có lỗi', Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                    dispatch(dismissLoading())
                }

            }

        } catch (error) {
            console.log(error);

            dispatch(dismissLoading());
            try {
                LoginManager.logOut();
                //  dispatch(loginFB())
            } catch (error) {
                console.log(error);
            }

        }

    }
};
export const signup = (data) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            let lang = await AsyncStorage.getItem('lang');
            const errors = validation({
                email: data.username,
                password: data.password,
                confirmPassword: data.confirmPassword,
                phone: data.phone
            }, constraints);
            //console.log(errors);


            if (data.name === "" || data.name == null) {
                Toast.show(lang === 'vi' ? "Tên không được để trống " : "Name is not emty", Toast.SHORT, Toast.TOP, {
                    height: 50,
                    width: 400,
                    backgroundColor: '#ffca00',
                    opacity: 0.5,
                    textAlign: 'center',
                    lines: 1,
                    borderRadius: 3
                });
                dispatch(dismissLoading())
            } else {
                if (data.password === data.confirmPassword) {
                    let user = await signUpAsync(data);
                    try {
                        if (user.id) {
                            Toast.show(lang === 'vi' ? "Đăng ký thành công. Vui lòng vào mail kích hoạt tài khoản" : "Registration successful. Please  check mail to activation account", Toast.SHORT, Toast.TOP, {
                                height: 50,
                                width: 400,
                                backgroundColor: '#ffca00',
                                opacity: 0.5,
                                textAlign: 'center',
                                lines: 1,
                                borderRadius: 3
                            });
                            dispatch(dismissLoading());
                            dispatch(NavigationActions.back())
                        } else {
                            for (msg of user) {
                                Toast.show(msg.msg + " ", Toast.SHORT, Toast.TOP, {
                                    height: 50,
                                    width: 400,
                                    backgroundColor: '#ffca00',
                                    opacity: 0.5,
                                    textAlign: 'center',
                                    lines: 1,
                                    borderRadius: 3
                                });
                            }
                            dispatch(dismissLoading())
                        }
                    } catch (error) {
                        console.log(error);
                        dispatch(dismissLoading())

                    }
                } else {
                    Toast.show(lang === 'vi' ? 'Mật khẩu không trùng khớp' : 'Passwords do not match', Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });

                }
            }
        } catch (error) {
            console.log(error);
            dispatch(dismissLoading())
        }

    }
};
export const updatePasswordAsync = async (data, token) => {
    return await fetch("https://api.cohober.vn/api/users/changePassword", {
        method: 'POST',
        headers: {
            "Authorization": token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "oldPassword": data.currentPassword,
            "newPassword": data.newPassword
        })
    }).then(async (response) => {
        return await response.json();
    }).then(async (res) => {
        return await res
    })
};
export const updatePassword = (data) => {
    return async (dispatch) => {
        try {
            let lang = await AsyncStorage.getItem('lang');
            if (data.newPassword !== data.confirmPassword) {
                Toast.show(lang === 'vi' ? 'Mật khẩu không trùng khớp' : 'Passwords do not match', Toast.SHORT, Toast.TOP, {
                    height: 50,
                    width: 400,
                    backgroundColor: '#ffca00',
                    opacity: 0.5,
                    textAlign: 'center',
                    lines: 1,
                    borderRadius: 3
                });
            } else {
                try {
                    let token = await AsyncStorage.getItem('token');
                    let user = await updatePasswordAsync(data, token);
                    try {
                        if (user.id) {
                            dispatch(NavigationActions.back())
                        } else {
                            for (msg of user) {

                                Toast.show(msg.msg, Toast.SHORT, Toast.TOP, {
                                    height: 50,
                                    width: 400,
                                    backgroundColor: '#ffca00',
                                    opacity: 0.5,
                                    textAlign: 'center',
                                    lines: 1,
                                    borderRadius: 3
                                });
                            }
                        }
                        console.log(user)
                    } catch (error) {
                        console.log(error)

                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
};

export const forgotPasswordAsync = async (email) => {
    try {
        let lang = await AsyncStorage.getItem('lang');
        return await fetch("https://api.cohober.vn/api/users/forgotPassword", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: lang ? JSON.stringify({"email": email, "language": lang}) : JSON.stringify({"email": email})
        }).then(async (response) => {
            return await response.json();
        }).then(async (res) => {
            return await res
        })
    } catch (err) {
        console.log(err)
    }
};
export const forgotPassword = (email) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let user = await forgotPasswordAsync(email);
            Toast.show(user.message ? user.message + " " : "email not exist", Toast.SHORT, Toast.TOP, {
                height: 50,
                width: 400,
                backgroundColor: '#ffca00',
                opacity: 0.5,
                textAlign: 'center',
                lines: 1,
                borderRadius: 3
            });
            dispatch(NavigationActions.back());
            dispatch(dismissLoading())

        } catch (error) {
            console.log(error);
            dispatch(dismissLoading())
        }
    }
};
export const logOutAsync = async (token) => {
    const device = deviceInfo();

    return await fetch("https://api.cohober.vn/api/users/logout", {
        method: 'POST',
        headers: {
            "Authorization": token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "platform": device.platform,
            "deviceId": device.deviceId
        })
    }).then(async (response) => {
        return await response.json();
    }).then(async (res) => {
        return await res
    })

};
export const logout = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {

            let tokens = await AsyncStorage.getItem('token');
            let user = await logOutAsync(tokens);
            let token = await AsyncStorage.removeItem('token');

            Promise.all([user, token]).then(() => {
                // Toast.show('Thành công',Toast.SHORT,Toast.TOP,{
                //     height:  50,
                //     backgroundColor:'#ffca00',
                //     opacity:0.5,
                //     textAlign:'center',
                //     lines:1

                //    });
                dispatch(logoutSuccess());
                dispatch(dismissLoading())

            })
        } catch (error) {
            console.log(error);
            dispatch(dismissLoading())
        }

    }
};