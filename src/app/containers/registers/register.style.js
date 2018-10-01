import {StyleSheet} from "react-native";
import * as g from "../../util";

export default StyleSheet.create({
    input: {
        backgroundColor: '#cacaca',
        // borderColor:'#595959',
        borderRadius: 3 * (g.rh + g.rw),
        paddingLeft: 10 * g.rw,
        paddingRight: 10 * g.rw
    },
    txtSignUp: {
        textAlign: 'center',
        fontFamily: 'Roboto-BoldCondensed',
        fontSize: 15,
        color: '#383838',
        backgroundColor: 'rgba(255,255,255,0)'
    },
    btnSignUp: {
        backgroundColor: '#ffca00',
        width: g.sw - 70 * g.rw,
        height: 50 * g.rh,
        borderRadius: 3 * (g.rh + g.rw),
        marginTop: 15 * g.rh,
        justifyContent: 'center',

    }
});
