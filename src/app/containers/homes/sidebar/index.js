import React, { PureComponent } from 'react';
import { View, } from 'react-native';
import MainSideBar from './ItemSideBar/main';
import HeaderSideBar from './ItemSideBar/header';

export default class Sidebar extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('Sidebar');
        return (
            <View style={{ flex: 1, backgroundColor: '#ffca00', flexDirection: 'column' }}>
                <HeaderSideBar
                    navigation={this.props.navigation}
                    user={this.props.user}
                    lang={this.props.lang}
                    style={{ flex: 1 / 3 }}
                />
                <MainSideBar
                    navigation={this.props.navigation}
                    user={this.props.user}
                    signOut={this.props.signOut}
                    style={{ flex: 2 / 3 }}
                    lang={this.props.lang}
                    onChangeLang={this.props.onChangeLang}
                />
            </View>
        )
    }
}
