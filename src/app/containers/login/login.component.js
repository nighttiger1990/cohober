import { ActivityIndicator, AsyncStorage, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from './login.style';
import * as g from '../../util';

class Login extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    async componentWillMount() {

        try {
            this.props.onRefreshToken();
            let lang = await AsyncStorage.getItem('lang');
            if (lang) {
                this.props.onChangeLang(lang)
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ isLoading: false }), 3000)
    }

    render() {
        if (this.props.auth.isLoading || this.state.isLoading) {
            return (
                <View style={{
                    backgroundColor: '#ffca00',
                    flex: 1,
                    width: g.sw,
                    height: g.sh,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute'
                }}>
                    <Image
                        style={{ width: 105 * g.rw, height: 65, resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../../assets/image/logo_cohober.png')} />
                    <Text style={{
                        fontFamily: 'UTM Colossalis',
                        color: '#332401',
                        fontSize: 16,
                        alignSelf: 'center',
                        backgroundColor: 'rgba(255,255,255,0)'
                    }}>COHOBER</Text>
                    <Text style={{
                        alignSelf: 'center',
                        fontFamily: 'UTM Colossalis',
                        color: '#303030',
                        marginTop: 10 * g.rh,
                        marginBottom: 10 * g.rh,
                        fontSize: 20,
                        backgroundColor: 'rgba(255,255,255,0)'
                    }}>Kết nối thành công</Text>
                    <ActivityIndicator color={'#ff0000'} style={{ position: 'absolute' }} animating={true} />
                </View>
            )
        } else {
            return (

                <View style={{ backgroundColor: '#ffffff', width: g.sw, height: g.sh, alignItems: 'center' }}>

                    <Image style={{
                        height: 160 * g.rh,
                        width: g.sw * 0.8,
                        marginTop: 90 * g.rh,
                        resizeMode: 'stretch',
                        position: 'absolute',
                        alignSelf: 'center'
                    }} source={require('../../assets/image/bg_logo.png')} />
                    <Image
                        style={{
                            marginTop: 105 * g.rh,
                            width: 105 * g.rw,
                            height: 65,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                        source={require('../../assets/image/logo_cohober.png')} />
                    <Text style={{
                        fontFamily: 'UTM Colossalis',
                        color: '#332401',
                        fontSize: 17 * g.rh,
                        alignSelf: 'center',
                        backgroundColor: 'rgba(255,255,255,0)'
                    }}>COHOBER</Text>
                    <Text style={{
                        alignSelf: 'center',
                        fontFamily: 'UTM Colossalis',
                        color: '#303030',
                        marginTop: 10 * g.rh,
                        marginBottom: 10 * g.rh,
                        fontSize: 20,
                        backgroundColor: 'rgba(255,255,255,0)'
                    }}>Kết nối thành công</Text>

                    <TouchableOpacity style={{ marginTop: g.rh * 55, }}
                        onPress={() => this.props.navigation.navigate('SignIn')}>
                        <View>
                            <Image
                                style={[styles.button, {
                                    width: g.sw * 0.8,
                                    height: g.sw * 0.8 * 190 / 900,
                                    alignSelf: 'center',
                                }]}
                                source={require('../../assets/bg_ln_ac.png')} />
                            <View style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: g.sw * 0.8 * 190 / 900,
                                width: g.sw * 0.8,
                                paddingLeft: 5 * (g.rh + g.rw),
                                paddingRight: 10 * (g.rh + g.rw)
                            }}>
                                <Image source={require('../../assets/icons/icon_account.png')}
                                    style={styles.icAccount} />
                                <Text
                                    style={styles.txtAccount}>{(this.props.lang.content.loginAc + '').toUpperCase()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 15 * g.rh }} onPress={() => this.props.onLoginFB()}>
                        <View>
                            <Image
                                style={[styles.button, {
                                    width: g.sw * 0.8,
                                    height: g.sw * 0.8 * 190 / 900,
                                    alignSelf: 'center',
                                }]}
                                source={require('../../assets/bg_ln_fb.png')} />
                            <View style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: g.sw * 0.8 * 190 / 900,
                                width: g.sw * 0.8,
                                paddingLeft: 5 * (g.rh + g.rw),
                                paddingRight: 10 * (g.rh + g.rw)
                            }}>
                                <Image source={require('../../assets/icons/icon_fb.png')} style={styles.icAccount} />
                                <Text
                                    style={styles.txtAccount}>{(this.props.lang.content.loginFb + '').toUpperCase()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: g.rh * 20 }}
                        onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                        <View style={{ borderRadius: 10 }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#383838',
                                fontFamily: 'Roboto-BoldCondensed',
                                fontSize: 16 * g.rh,
                                backgroundColor: 'rgba(255,255,255,0)'
                            }}>{this.props.lang.content.forgetPass + "?"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}


export default Login;