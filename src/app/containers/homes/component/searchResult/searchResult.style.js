import { StyleSheet } from 'react-native'

const g = require('../../../../util/index');
export default StyleSheet.create({
    searchResultsWrapper: {
        top: 160 * g.rh,
        position: "absolute",
        width: g.sw -25,
        height: 1000 * g.rh,
        backgroundColor: "#fff",
        opacity: 0.9,
        marginLeft: 15,
        marginRight: 10
    },
    primaryText: {
        fontWeight: "bold",
        color: "#373737"
    },
    secondaryText: {
        fontStyle: "italic",
        color: "#7D7D7D",
    },
    leftContainer: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor: "#7D7D7D",
    },
    leftIcon: {
        fontSize: 20,
        color: "#7D7D7D",
    },
    distance: {
        fontSize: 12,
    }
})