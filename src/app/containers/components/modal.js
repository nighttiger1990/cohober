import React, {PureComponent} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

let g = require('../../util');
export default class ModalPopup extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible
        }
    }

    render() {
        if (this.props.modalVisible) {
            return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    animated={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({modalVisible: false})}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.btnClose}
                                              onPress={() => this.setState({modalVisible: false})}>
                                <Text style={styles.txtClose}>X</Text>
                            </TouchableOpacity>
                            <View style={styles.header2}>
                                <Text style={styles.txtTitle}>{(this.props.title).toUpperCase()}</Text>
                            </View>
                            <View style={styles.hr}/>
                            <View style={styles.bgContent}>
                                <Text style={styles.txtContent}>{this.props.content}</Text>
                            </View>
                            <View style={styles.bgBottom}>
                                <TouchableOpacity style={styles.btnBg}
                                                  onPress={() => this.setState({modalVisible: false})}>
                                    <Text style={styles.txtClose2}>{'Đóng'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>)
        } else return (<View/>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    header: {
        height: 260 * g.rh,
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
    }, txtClose: {
        fontSize: 15 * g.rh,
        fontFamily: 'Roboto-Bold',
        color: '#e29600'
    }, header2: {
        alignContent: 'center',
        height: 35 * g.rh,
        width: g.sw - 110 * g.rw,
        alignSelf: 'center'
    }, txtTitle: {
        fontFamily: 'Roboto-BoldCondensed',
        color: '#e29600',
        alignSelf: 'center',
        fontSize: 20 * g.rh,
    }, hr: {
        height: 1,
        width: null,
        backgroundColor: '#ffd72c'
    }, bgBottom: {
        flexDirection: 'row',
        bottom: 0,
        marginTop: 35 * g.rh,
        marginBottom: 15 * g.rh,
        alignItems: 'center',
        justifyContent: 'center'
    }, btnBg: {
        backgroundColor: '#e29600',
        height: 55 * g.rh,
        width: 150 * g.rw,
        justifyContent: 'center',
        borderRadius: 2
    }, txtClose2: {
        color: '#fff',
        fontFamily: 'Roboto-BoldCondensed',
        alignSelf: 'center',
        fontSize: 16 * g.rh
    }, bgContent: {
        height: 80 * g.rh,
        alignItems: 'center',
        justifyContent: 'center'
    }, txtContent: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 18 * g.rh,
        color: '#383838'
    }
});
