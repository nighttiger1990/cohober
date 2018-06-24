import Toast from "react-native-toast-native";
import { ActivityIndicator, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, Container, Content, Form, Header, Input, Item, Left, Right, Title } from 'native-base'
import styles from './signin.style';
import HComponent from "../common/HComponent";
import * as g from '../../util';
import React from "react";

export default class SignIn extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    validate = (text) => {
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (reg.test(text))
    };

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            disable: false,
            isLoading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ isLoading: false }), 3000)
    }

    signIn() {
        console.log("user name", this.state.username);
        console.log("pass ", this.state.password);
        if (!this.validate(this.state.username)) {
            // email lỗi
            Toast.show(this.props.lang.type === 'vi' ? "Email không hợp lệ" : 'Email is wrong', Toast.SHORT, Toast.TOP, {
                height: 50,
                width: 400,
                backgroundColor: '#ffca00',
                opacity: 0.5,
                textAlign: 'center',
                lines: 1,
                borderRadius: 3
            });

        } else {
            if ((this.state.username + "").trim() != null && (this.state.password + "").trim() != null) {
                let data = {
                    username: this.state.username,
                    password: this.state.password
                };
                this.props.onSignIn(data);
            } else {
                Toast.show(this.props.lang.type === 'vi' ? "Vui lòng kiểm tra lại" : 'Please check again', Toast.SHORT, Toast.TOP, {
                    height: 50,
                    width: 400,
                    backgroundColor: '#ffca00',
                    opacity: 0.5,
                    textAlign: 'center',
                    lines: 1,
                    borderRadius: 3
                });
            }
        }

    }

    render() {
        if (this.props.auth.isLoading || this.state.isLoading) {
            return (
                <View style={styles.no_touch}>
                    <ActivityIndicator
                        animating={true}
                        color='#ffca00'
                        size="large"
                        style={styles.activityIndicator}

                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor={'#ffca00'} barStyle={'dark-content'} />
                    {
                        this.props.auth.isLoading && <View style={styles.no_touch}>
                            <ActivityIndicator
                                animating={true}
                                color='#ffca00'
                                size="large"
                                style={styles.activityIndicator}

                            />
                        </View>
                    }
                    <View style={{ width: g.sw, height: g.sh, backgroundColor: '#fff' }}>
                        <Container>
                            <Header style={{ backgroundColor: '#ffca00' }} androidStatusBarColor="#ffca00">
                                <Left>
                                    <Button transparent delayLongPress={500}
                                        onPress={() => requestAnimationFrame(() => {
                                            this.props.navigation.goBack()
                                        })}>
                                        <Image style={{ width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain' }}
                                            source={require('../../assets/icons/login_back.png')} />
                                    </Button>
                                </Left>
                                <Title style={{ alignSelf: 'center', color: '#383838' }} />
                                <Right>

                                </Right>
                            </Header>

                            <Content>
                                <Image style={{
                                    height: 160 * g.rh,
                                    width: g.sw - 70 * g.rw,
                                    marginTop: 40 * g.rh,
                                    resizeMode: 'stretch',
                                    position: 'absolute',
                                    alignSelf: 'center'
                                }} source={require('../../assets/image/bg_logo.png')} />
                                <Image
                                    style={{
                                        marginTop: 55 * g.rh,
                                        width: 105 * g.rw,
                                        height: 65,
                                        resizeMode: 'contain',
                                        alignSelf: 'center'
                                    }}
                                    source={require('../../assets/image/logo_cohober.png')} />
                                <Text style={{
                                    fontFamily: 'UTM Colossalis',
                                    color: '#332401',
                                    fontSize: 16,
                                    alignSelf: 'center'
                                }}>COHOBER</Text>
                                <Text style={{
                                    alignSelf: 'center',
                                    fontFamily: 'UTM Colossalis',
                                    color: '#303030',
                                    marginTop: 10 * g.rh,
                                    marginBottom: 10 * g.rh,
                                    fontSize: 20
                                }}>Kết nối thành công</Text>
                                <Form style={{ marginTop: 35 * g.rh, width: g.sw - 70 * g.rw, alignSelf: 'center' }}>
                                    <Item style={[styles.input, {
                                        borderColor: (this.state.username + "").trim() === "" ? "#ff0000" : "transparent",
                                        borderWidth: (this.state.username + "").trim() === "" ? 1 : 0
                                    }]} regular>
                                        <Image source={require('../../assets/icons/login_account.png')}
                                            style={{ resizeMode: 'contain', width: 30 * g.rw, height: 30 * g.rh }} />
                                        <Input
                                            autoCapitalize='none'
                                            placeholderTextColor="#999999"
                                            style={{ fontFamily: 'Roboto-Condensed', textAlign: 'center' }}
                                            placeholder="email"
                                            onChangeText={(text) => {
                                                this.setState({ username: text })
                                            }}
                                            keyboardType={'email-address'} />
                                        {/* <Image source={require('../assets/icons/home_next.png')} style={{resizeMode:'contain',width:15*g.rw,height:15*g.rh}}/> */}
                                    </Item>
                                    <Item style={[styles.input, {
                                        marginTop: 10 * g.rh,
                                        borderColor: (this.state.username + "").trim() === "" ? "#ff0000" : "transparent",
                                        borderWidth: (this.state.username + "").trim() === "" ? 1 : 0
                                    }]} regular>
                                        <Image source={require('../../assets/icons/login_Lock.png')}
                                            style={{ resizeMode: 'contain', width: 30 * g.rw, height: 30 * g.rh }} />
                                        <Input
                                            autoCapitalize='none'
                                            placeholderTextColor="#999999"
                                            style={{ fontFamily: 'Roboto-Condensed', textAlign: 'center' }}
                                            placeholder={(this.props.lang.content.password + "").toLowerCase()}
                                            secureTextEntry={true}
                                            onChangeText={(text) => {
                                                this.setState({ password: text })
                                            }} />
                                    </Item>

                                    <TouchableOpacity style={{ marginTop: 40 * g.rh }}
                                        onPress={() => requestAnimationFrame(() => {
                                            this.signIn()
                                        })}>
                                        <View style={{
                                            backgroundColor: '#ffca00',
                                            width: g.sw - 70 * g.rw,
                                            height: 50 * g.rh,
                                            borderRadius: 3 * (g.rh + g.rw),
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                fontFamily: 'Roboto-BoldCondensed',
                                                fontSize: 16,
                                                color: '#383838'
                                            }}>{(this.props.lang.content.login + "").toUpperCase()}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </Form>
                            </Content>

                        </Container>
                    </View>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        top: g.sh - 90 * g.rh,
                        bottom: 10 * g.rh,
                        height: 50 * g.rh,
                        left: 40 * g.rw,
                        right: 40 * g.rw,
                        backgroundColor: 'rgba(255,255,255,0)'
                    }} onPress={() => requestAnimationFrame(() => this.props.navigation.navigate('Register'))}>
                        <View style={{ borderRadius: 10, }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#383838',
                                fontFamily: 'Roboto-BoldCondensed',
                                fontSize: 15
                            }}>{this.props.lang.content.signupAc + ""}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            );
        }
    }
}
