import {StyleSheet} from "react-native";
import * as g from '../../util';

const styles = StyleSheet.create({
    container: {
        width: g.sw,
        height: g.sh,
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
    txtNoData: {
        fontFamily: 'Roboto-Condensed',
        color: '#383838',
        alignSelf: 'center',
        marginTop: 15 * g.rh,
        opacity: 0.5
    },
    bgHr: {
        height: 35 * g.rh,
        width: g.sw,
        backgroundColor: '#cfcfcf'
    }
});
export default styles;