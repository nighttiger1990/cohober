import * as g from '../../util';
import {Platform,StyleSheet}from'react-native'

const styles = StyleSheet.create({
    actionButtonIcon: {
        height: 42 * g.rh,
        width: 42 * g.rw,
        resizeMode: 'contain'
    },
    mapV: {
        marginTop: Platform.OS === 'ios' ? 49 * g.rh : 60 * g.rh,
        height: Platform.OS === 'ios' ? g.sh - 50 * g.rh : g.sh - 89 * g.rh,
        width: g.sw - 1 * g.rw,
        marginLeft: 0,
        bottom: 0,
        marginBottom: Platform.OS === 'ios' ? 5 * g.rh : 1 * g.rh,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    mapCallout: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderRadius: 3 * (g.rh + g.rw),
        borderWidth: 2,
        height: 85 * g.rh,
        width: 180 * g.rw,
    },
    titleMapCallOut: {
        color: '#b12500',
        fontFamily: 'Roboto-BoldCondensed',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15 * g.rw,
    },
    detailMapCallOut: {
        color: '#3c3c3b',
        fontFamily: 'Roboto-Condensed',
        textAlign: 'center',
        fontSize: 13 * g.rw
    },
    priceMapCallout: {
        color: '#ff7e00',
        fontFamily: 'Roboto-BoldCondensed',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 13 * g.rw
    }, no_touch: {
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
    imgSeg: {
        alignSelf: 'center',
        width: 40 * g.rw,
        height: 40 * g.rh,
        resizeMode: 'contain',
        marginTop: 4 * g.rh
    },
    bgSegment: {
        height: 80 * g.rh,
        width: 90 * g.rw,
        backgroundColor: 'rgba(255,255,255,0)',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 3
    },
    segment: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0)'
    },
    bgTitleSegment: {
        backgroundColor: '#c07100',
        borderRadius: 3,
        width: 80 * g.rw,
        height: 22 * g.rh,
        alignSelf: 'center',
        marginTop: 8 * g.rh,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSegment: {
        fontFamily: 'Roboto-BoldCondensed',
        fontSize: 12 * g.rh
    },
    btnFab: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 60 * g.rw,
        width: 60 * g.rw,
        backgroundColor: '#ffa200',
        borderRadius: 100,
        marginBottom: 8 * g.rh,
        marginLeft: 10 * g.rw,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    header: {
        padding: 5 * (g.rh + g.rw),
        width: g.sw - 60 * g.rw,
        backgroundColor: '#eef',
        alignSelf: 'center',
        borderRadius: 4
    },
    btnClose: {
        borderRadius: 50,
        borderWidth: 2,
        width: 30 * g.rw,
        height: 30 * g.rh,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderColor: '#e29600'
    },
    txtClose: {
        fontSize: 15 * g.rh,
        fontFamily: 'Roboto-Bold',
        color: '#e29600'
    },
    header2: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 45 * g.rh,
        width: g.sw - 110 * g.rw,
        alignSelf: 'center'
    },
    txtTitle: {
        fontFamily: 'Roboto-BoldCondensed',
        color: '#e29600',
        alignSelf: 'center',
        fontSize: 20 * g.rh,
    },
    hr: {
        height: 1,
        width: null,
        backgroundColor: '#ffd72c'
    },
    bgBottom: {
        flexDirection: 'row',
        bottom: 0,
        marginTop: 20 * g.rh,
        marginBottom: 15 * g.rh,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    btnBg: {
        backgroundColor: '#e29600',
        height: 55 * g.rh,
        width: 150 * g.rw,
        justifyContent: 'center',
        borderRadius: 2
    },
    txtClose2: {
        color: '#fff',
        fontFamily: 'Roboto-BoldCondensed',
        alignSelf: 'center',
        fontSize: 16 * g.rh
    },
    bgContent: {
        height: 100 * g.rh
    },
    txtContent: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 18 * g.rh,
        color: '#383838'
    },
    btnCurrentLocation: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 15 * g.rw,
        marginBottom: 15 * g.rh,
        backgroundColor: '#ccc',
        height: 50 * g.rh,
        width: 50 * g.rw,
        borderRadius: 4 * (g.rw + g.rh),
        shadowColor: '#000',
        shadowOffset: {height: 55 * g.rh, width: 55 * g.rw},
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnFabAdd: {
        marginRight: 275 * g.rw,
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    btnSegment: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        alignSelf: 'center',
        width: 248 * g.rw
    },
    txtSegmentFirst: {
        backgroundColor: 'rgba(255,255,255,0)',
        color: '#383838',
        width: 65 * g.rw,
        textAlign: 'center'
    },
    txtSegmentLast: {
        backgroundColor: 'rgba(255,255,255,0)',
        color: '#383838',
        width: 65 * g.rw,
        alignSelf: 'center',
        textAlign: 'center'
    },
    imgLocation: {
        width: 30 * g.rw,
        height: 30 * g.rh,
        resizeMode: 'contain',
        opacity: 0.75
    }, imgMarker: {
        width: 30,
        height: 30
    }

});
export default styles;