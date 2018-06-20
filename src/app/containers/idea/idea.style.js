import {StyleSheet} from "react-native";
import * as g from '../../util';

const styles = StyleSheet.create({
    no_touch: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: g.sw,
        height: g.sh,
    },
    activityIndicator: {
        position: 'absolute',
        top: (g.sh - 80) / 2,
        left: (g.sw - 80) / 2,
        width: 80,
        height: 80,
    },
    txtNote: {
        fontFamily: 'Roboto-BoldCondensed',
        color: '#595959',
        fontWeight: 'bold',
        fontSize: 15 * g.rw
    },

});
export default styles;