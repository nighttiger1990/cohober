import {StyleSheet} from "react-native";
import * as g from '../../../util';

const styles = StyleSheet.create({
    bgLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        height: 35 * g.rh,
        width: g.sw,
        backgroundColor: '#cfcfcf'
    },
    listItem: {
        flex: 1,
        paddingLeft: 15
    }


});
export default styles;