import {StyleSheet} from "react-native";
import * as g from '../../util';

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#cacaca',
        // borderColor:'#595959',
        borderRadius: 3 * (g.rh + g.rw),
        paddingLeft: 10 * g.rw,
        paddingRight: 10 * g.rw
    }, no_touch: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: g.sw,
        height: g.sh,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    activityIndicator: {
        position: 'absolute',
        top: (g.sh - 80) / 2,
        left: (g.sw - 80) / 2,
        width: 80,
        height: 80,
    },
});
export default styles;