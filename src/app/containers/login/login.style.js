import {StyleSheet} from "react-native";
import * as g from '../../util';

const styles = StyleSheet.create({
    container: {
        width: g.sw,
        height: g.sh,
        backgroundColor: '#ffca00',
    }, no_touch: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: g.sw,
        height: g.sh,
        zIndex: 1,
    },
    activityIndicator: {
        position: 'absolute',
        top: (g.sh - 80) / 2,
        left: (g.sw - 80) / 2,
        width: 80,
        height: 80
    },
    icAccount: {
        flex: 1 / 6,
        width: 40 * g.rw,
        height: 45 * g.rh,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    txtAccount: {
        fontFamily: 'Roboto-BoldCondensed',
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0)',
        fontSize: 17 * g.rh
    }
});
export default styles;