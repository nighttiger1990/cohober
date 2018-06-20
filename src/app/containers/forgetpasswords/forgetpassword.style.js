import {StyleSheet} from 'react-native';

import * as g from '../../util';

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#cacaca',
        // borderColor:'#595959',
        borderRadius: 3 * (g.rh + g.rw),
        paddingLeft: 10 * g.rw,
        paddingRight: 10 * g.rw,
        width: g.sw - 70 * g.rw,
        alignSelf: 'center'
    }
});
export default styles;