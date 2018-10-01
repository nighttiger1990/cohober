import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

let g = require('../../../../../util/index');
export default class HeaderImageSideBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null
        }
    }

    componentDidMount() {
        this.setState(this.props.user)
    }

    render() {
        if (this.props.user) {
            if (this.props.user.avatar) {
                return (<View style={styles.container}>
                    {
                        this.props.user.avatar ? (
                            <Image source={{uri: this.props.user.avatar ? this.props.user.avatar : ""}}
                                   style={styles.avatar}/>
                        ) : (<Image source={require('../../../../../assets/image/avatar2.png')} style={styles.avatar}/>)
                    }
                    <View style={styles.borderText}>
                        <Text
                            style={styles.nameText}>{this.props.user ? (this.props.user.email ? (this.props.user.email) : (this.props.user.name ? (this.props.user.name) : null)) : null}</Text>
                    </View>
                </View>)
            } else {
                return (<View style={styles.container}>
                    <Image source={require('../../../../../assets/image/avatar2.png')} style={styles.avatar}/>
                    <View style={styles.borderText}>
                        <Text
                            style={styles.nameText}>{this.props.user ? (this.props.user.email ? (this.props.user.email) : (this.props.user.name ? (this.props.user.name) : null)) : null}</Text>
                    </View>
                </View>)
            }
        } else {
            return (<View style={styles.container}>
                <Image source={require('../../../../../assets/image/avatar2.png')} style={styles.avatar}/>
                <View style={styles.borderText}>
                    <Text
                        style={styles.nameText}>{this.props.user ? (this.props.user.email ? (this.props.user.email) : "xxxx") : null}</Text>
                </View>
            </View>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffca00'
    },
    avatar: {
        resizeMode: 'stretch',
        height: 110 * g.rh,
        width: 100 * g.rw,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        marginTop: 20 * g.rh,
    },
    borderText: {
        marginTop: 20 * g.rh,
        alignSelf: 'center',
        backgroundColor: '#ff9c00',
        borderRadius: 8,
        height: 45 * g.rh,
        width: g.sw - 140 * g.rw,
        justifyContent: 'center'
    },
    nameText: {
        fontFamily: 'Roboto-BoldCondensed',
        color: '#2f2f2f',
        textAlign: 'center',

    }
});
