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
