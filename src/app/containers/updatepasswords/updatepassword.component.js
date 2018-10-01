import HComponent from "../common/HComponent";
import {ActivityIndicator, Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import NB, {Body, Button, Content, Form, Header, Input, Item, Left} from 'native-base';
import styles from './updatepassword.style';
import React from "react";
import * as g from '../../util/index';

export default class UpdatePassword extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
            image: null,
            isLoading: true
        }
    }

    updatePass() {
        let data = {
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
        };
        this.props.onUpdatePassword(data)
    }

    componentDidMount() {
        setTimeout(() => this.setState({isLoading: false}), 3000)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size={'large'} color={'#ffca00'}/>

                </View>)
        } else
            return (
                <View>
                    <StatusBar backgroundColor={'#ffca00'} barStyle={'dark-content'}/>
                    <View style={{width: g.sw, height: g.sh, backgroundColor: '#fff'}}>
                        <Header style={{backgroundColor: '#ffca00', position: 'relative'}}
                                   androidStatusBarColor="#ffca00">
                            <Left>
                                <Button transparent onPress={() => requestAnimationFrame(() => {
                                    this.props.navigation.goBack()
                                })}>
                                    <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain'}}
                                           source={require('../../assets/icons/login_back.png')}/>
                                </Button>
                            </Left>
                            <Body>
                                <NB.Title style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#383838'
                                }}>{(this.props.lang.content.updatePass + '').toUpperCase()}</NB.Title>
                            </Body>

                            <NB.Right/>
                        </Header>
                        <Content>

                            <Form style={{marginTop: 35 * g.rh, width: g.sw - 70 * g.rw, alignSelf: 'center'}}>
                                <Item style={[styles.input]} regular>
                                    <Image source={require('../../assets/icons/login_Lock.png')}
                                           style={{resizeMode: 'contain', width: 30 * g.rw, height: 30 * g.rh}}/>
                                    <Input placeholderTextColor="#999999"
                                              style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                              placeholder={(this.props.lang.content.currentPass + "").toLowerCase()}
                                              onChangeText={(text) => {
                                                  this.setState({currentPassword: text})
                                              }} secureTextEntry={true}/>

                                </Item>
                                <Item style={[styles.input, {marginTop: 10 * g.rh}]} regular>
                                    <Image source={require('../../assets/icons/login_Lock.png')}
                                           style={{resizeMode: 'contain', width: 30 * g.rw, height: 30 * g.rh}}/>
                                    <Input placeholderTextColor="#999999"
                                              style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                              placeholder={(this.props.lang.content.newPass + "").toLowerCase()}
                                              secureTextEntry={true} onChangeText={(text) => {
                                        this.setState({newPassword: text})
                                    }}/>
                                </Item>
                                <NB.Item style={[styles.input, {marginTop: 10 * g.rh}]} regular>
                                    <Image source={require('../../assets/icons/login_Lock.png')}
                                           style={{resizeMode: 'contain', width: 30 * g.rw, height: 30 * g.rh}}/>
                                    <NB.Input placeholderTextColor="#999999"
                                              style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                              placeholder={(this.props.lang.content.confirmPass + "").toLowerCase()}
                                              secureTextEntry={true}
                                              onChangeText={(text) => {
                                                  this.setState({confirmPassword: text})
                                              }}/>

                                </NB.Item>

                                <TouchableOpacity onPress={() => {
                                    this.updatePass()
                                }}>
                                    <View style={{
                                        backgroundColor: '#ffca00',
                                        width: g.sw - 70 * g.rw,
                                        height: 50 * g.rh,
                                        borderRadius: 3 * (g.rh + g.rw),
                                        marginTop: 40 * g.rh,
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontFamily: 'Roboto-BoldCondensed',
                                            fontSize: 18
                                        }}>{(this.props.lang.content.update + "")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </Form>
                        </Content>


                    </View>
                </View>
            );
    }
}