import axios from 'axios';
import {Dimensions, Platform} from "react-native";

const platform = Platform.OS;
export const sw = Dimensions.get('window').width;
export const sh = Dimensions.get('window').height;
const dw = 375;
const dh = platform === "ios" ? 667 : 667 + 40;
export const rw = sw / dw;
export const rh = sh / dh;
export function  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

export const handleRequest = (api, success, failure) => {
    axios(api).then(response => {
        if (response.status === 200) {
            success(response.data)
        }
        else {
            var err_object = {
                error: response.data.error,
                msg: response.data.msg
            }
            failure(err_object);
        }
    })
    .catch(err => {
        var data = [];
        data['status'] = -1;
        failure(data);
        console.log("request failure", err)
    });
}
