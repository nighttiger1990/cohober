import {StyleSheet} from 'react-native';
import *as g from '../../../../util/index';

const styles = StyleSheet.create({
    itemCategory: {
        height: 50 * g.rh,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        margin: 20,
        flex: 1 / 7
    },
    itemName: {
        fontFamily: 'Roboto-BoldCondensed',
        color: '#595959',
        fontSize: 16,
        flex: 1
    },
    itemEnd: {
        flex: 1 / 7,
        width: 25,
        height: 25,
        margin: 20,
        justifyContent: 'flex-end'
    },
    itemHr: {
        height: 1,
        width: g.sw,
        backgroundColor: '#878787'
    }
});
export default styles;