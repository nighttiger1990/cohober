import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderImageSideBar from './header/imageheader';

let g = require('../../../../util/index');

export default class HeaderSideBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<View style={{marginBottom: 15 * g.rh, backgroundColor: '#ffca00'}}>
            <HeaderImageSideBar user={this.props.user}/>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userID: this.props.user.id})}>
                <View style={styles.borderTextBtn}>
                    <Text style={styles.textBtn}>{this.props.lang.content.editProfile}</Text>
                </View>
            </TouchableOpacity>
        </View>)
    }
}

const styles = StyleSheet.create({
    textBtn: {
        color: '#595959',
        fontFamily: 'Roboto-BoldCondensed',
        textAlign: 'center'
    },
    borderTextBtn: {
        backgroundColor: '#fff',
        width: g.sw - 140 * g.rw,
        height: 45 * g.rh,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15 * g.rh,
        borderRadius: 8
    }
});
