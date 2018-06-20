import {StyleSheet} from 'react-native';
import * as g from '../../util';

const styles = StyleSheet.create({
    bgLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: g.sw,
        height: g.sh
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