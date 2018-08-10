import React from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, Container, Content, Form, Header, Input, Item, Left, Right, Title } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast';
import validate from 'validate.js';
import * as g from '../../util';
import styles from './register.style'
import reactotronReactNative from 'reactotron-react-native';

export default class Register extends React.PureComponent {
    static navigationOptions = {
        header: null
    };
    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return (reg.test(text))
    };

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            confirmPassword: null,
            phone: null,
            name: null,
            isLoading: true
        }
    }

    signup() {
        if (!this.validate(this.state.username)) {
            // email lỗi
            this.refs.toast.show(this.props.lang.content.invalidEmail);
        } else {
            let data = {
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                phone: this.state.phone,
                name: this.state.name
            };

            if (this.state.confirmPassword === this.state.password) {
                if (validate.isNumber(parseFloat(this.state.phone))) {
                    if (!validate.isEmpty(this.state.name) && validate.isNumber(parseFloat(this.state.phone))) {
                        this.props.onSignUp(data,(message) => this.showToast(message));
                    } else {
                        this.refs.toast.show(this.props.lang.type === 'vi' ? "Vui lòng nhập họ và tên" : "Please type full name");
                    }
                } else {
                    this.refs.toast.show(this.props.lang.type === 'vi' ? "Vui lòng nhập số điện thoại" : "Please type phone number");
                }
            } else {
                this.refs.toast.show(this.props.lang.type === 'vi' ? "Mật khẩu không trùng khớp" : "Password not match");
            }
        }
    }
    showToast(message) {
        reactotronReactNative.log("qqqqq", message);
        this.refs.toast.show(message);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 3000);
    }

    render() {
        if (this.props.auth.isLoading || this.state.isLoading) {
            return (
                <View style={{
                    width: g.sw,
                    height: g.sh,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.01)'
                }}>
                    <ActivityIndicator
                        animating={true}
                        color='#ffca00'
                        size="large"
                        style={{ alignSelf: 'center' }}

                    />
                </View>
            )
        } else {
            return (
                <View>
                    <StatusBar backgroundColor={'#ffca00'} barStyle={'dark-content'} />
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
                                <Right />
                            </Header>
                            <KeyboardAvoidingView style={{ width: g.sw, height: g.sh, }}>

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
                                        <Item style={styles.input} regular error={!this.validate(this.state.username)}>
                                            <Image source={require('../../assets/icons/login_account.png')} style={{
                                                resizeMode: 'contain',
                                                width: 30 * g.rw,
                                                height: 30 * g.rh
                                            }} />
                                            <Input autoCapitalize='none' placeholderTextColor="#999999"
                                                style={{ fontFamily: 'Roboto-Condensed', textAlign: 'center' }}
                                                placeholder="email" onChangeText={(text) => {
                                                    this.setState({ username: text })
                                                }} keyboardType="email-address" />
                                            {/* <Image source={require('../assets/icons/home_next.png')} style={{resizeMode:'contain',width:15*g.rw,height:15*g.rh}}/> */}
                                        </Item>
                                        <Item style={[styles.input, { marginTop: 10 * g.rh }]} regular
                                            error={validate.isEmpty(this.state.password)}>
                                            <Image source={require('../../assets/icons/login_Lock.png')} style={{
                                                resizeMode: 'contain',
                                                width: 30 * g.rw,
                                                height: 30 * g.rh
                                            }} />
                                            <Input placeholderTextColor="#999999"
                                                style={{ fontFamily: 'Roboto-Condensed', textAlign: 'center' }}
                                                placeholder={(this.props.lang.content.password + "").toLowerCase()}
                                                secureTextEntry={true} onChangeText={(text) => {
                                                    this.setState({ password: text })
                                                }} />
                                            {/* <Image source={require('../assets/icons/home_next.png')} style={{resizeMode:'contain',width:15*g.rw,height:15*g.rh}}/> */}
                                        </Item>
                                        <Item style={[styles.input, { marginTop: 10 * g.rh }]} regular

                                            error={this.state.password !== this.state.confirmPassword}>
                                            <Image source={require('../../assets/icons/login_Lock.png')} style={{
                                                resizeMode: 'contain',
                                                width: 30 * g.rw,
                                                height: 30 * g.rh
                                            }} />
                                            <Input placeholderTextColor="#999999"
                                                style={{ fontFamily: 'Roboto-Condensed', textAlign: 'center' }}
                                                placeholder={(this.props.lang.content.confirmPass + "").toLowerCase()}
                                                secureTextEntry={true}
                                                onChangeText={(text) => {
                                                    this.setState({ confirmPassword: text })
                                                }} />
                                            {/* <Image source={require('../assets/icons/home_next.png')} style={{resizeMode:'contain',width:15*g.rw,height:15*g.rh}}/> */}
                                        </Item>
                                        <Item style={[styles.input, { marginTop: 10 * g.rh }]} regular
                                            error={!validate.isNumber(parseFloat(this.state.phone))}>
                                            <Image source={require('../../assets/icons/login_phone.png')} style={{
                                                resizeMode: 'contain',
                                                width: 30 * g.rw,
                                                height: 30 * g.rh
                                            }} />
                                            <Input placeholderTextColor="#999999"
                                                style={{ fontFamily: 'Roboto-Condensed', textAlign: 'center' }}
                                                placeholder={(this.props.lang.content.phone + "").toLowerCase()}
                                                keyboardType={'phone-pad'} onChangeText={(text) => {
                                                    this.setState({ phone: text })
                                                }} returnKeyType={'done'} returnKeyLabel={'xong'} />
                                            {/* <Image source={require('../assets/icons/home_next.png')} style={{resizeMode:'contain',width:15*g.rw,height:15*g.rh}}/> */}
                                        </Item>
                                        <Item style={[styles.input, { marginTop: 10 * g.rh }]} regular
                                            error={validate.isEmpty(this.state.name)}>
                                            <Image source={require('../../assets/icons/login_account.png')} style={{
                                                resizeMode: 'contain',
                                                width: 30 * g.rw,
                                                height: 30 * g.rh
                                            }} />
                                            <Input autoCapitalize='none' placeholderTextColor="#999999"
                                                style={{ fontFamily: 'Roboto-Condensed', textAlign: 'center' }}
                                                placeholder={(this.props.lang.content.fullName + "").toLowerCase()}
                                                onChangeText={(text) => {
                                                    this.setState({ name: text })
                                                }} returnKeyType={'done'} returnKeyLabel={'xong'} />
                                            {/* <Image source={require('../assets/icons/home_next.png')} style={{resizeMode:'contain',width:15*g.rw,height:15*g.rh}}/> */}
                                        </Item>
                                        <TouchableOpacity onPress={() => requestAnimationFrame(() => {
                                            this.signup()
                                        })}>
                                            <View style={styles.btnSignUp}>
                                                <Text
                                                    style={styles.txtSignUp}>{(this.props.lang.content.signup + "").toUpperCase()}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ height: 100 }} />
                                    </Form>
                                </Content>
                            </KeyboardAvoidingView>
                        </Container>

                    </View>
                    <Toast
                        ref="toast"
                        position='top'
                        positionValue={10} />
                </View>
            );
        }
    }
}
