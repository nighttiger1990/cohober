import {StyleSheet} from 'react-native'

const g = require('../../../../util/index');
export default StyleSheet.create({
    container: {
        width: g.sw,
        position: 'absolute',
        marginTop: 100 * g.rh
    },
    inputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 7
    },
    inputSearch: {
        fontSize: 14
    }
})