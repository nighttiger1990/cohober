import {StyleSheet} from 'react-native';
import * as g from "../../../util";

export default StyleSheet.create({
    header: {
        backgroundColor: '#ffca00'
    },
    imageLeft: {
        width: 25 * g.rw,
        height: 25 * g.rh,
        resizeMode: 'contain'
    },
    title: {
        alignSelf: 'center',
        color: '#383838',
        fontFamily: 'Roboto-BoldCondensed'
    },
    btnRight: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50 * g.rw
    }

})