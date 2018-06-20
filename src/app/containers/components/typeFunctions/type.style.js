import {StyleSheet} from 'react-native'

const g = require('../../../util');
export default StyleSheet.create({
    container: {
        width: g.sw - 66 * g.rw,
        position: 'absolute',
        marginTop: 70 * g.rh,
        backgroundColor: '#ffc000',
        alignSelf: 'center'
    },
    lineBtnHead: {
        flexDirection: 'row',
    },
    btnIdea: {
        flex: 1 / 2,
        alignItems: 'center',
        height: 66 * g.rh,
        borderRadius: 5,
        backgroundColor: '#fff',
        margin: 5,
        justifyContent: 'center'
    }
})