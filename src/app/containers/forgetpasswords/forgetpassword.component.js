import React from "react";
import Toast from "react-native-toast-native";
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './forgetpassword.style';
import * as g from '../../util';
import TOOLBAR from "../components/toolbar";
import Loading from "../components/loading";
import {Input, Item} from 'native-base';

class ForgetPassword extends React.Component {
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
            email: null
        }
    }

    componentDidMount() {

    }

    submit() {
        if (!this.validate(this.state.email)) {
            Toast.show(this.props.lang.content.invalidEmail + " ", Toast.SHORT, Toast.TOP, {
                height: 50,
                width: 400,
                backgroundColor: '#ffca00',
                opacity: 0.5,
                textAlign: 'center',
                lines: 1,
                borderRadius: 3
            });
        } else {
            this.props.onForget(this.state.email)
        }
    }

    render() {
        if (this.props.auth.isLoading) {
            return (<Loading/>)
        } else {
            return (
                <View style={{backgroundColor: '#ffffff', width: g.sw, height: g.sh}}>

                    <TOOLBAR imageLeft={require('../../assets/icons/login_back.png')}
                             leftPress={() => requestAnimationFrame(() => this.props.navigation.goBack())}
                             title={(this.props.lang.content.forgetPass + "").toUpperCase()}
                    />

                    <Item style={[styles.input, {marginTop: 30 * g.rh}]} regular>
                        <Image source={require('../../assets/icons/login_account.png')}
                               style={{resizeMode: 'contain', width: 30 * g.rw, height: 30 * g.rh}}/>
                        <Input autoCapitalize='none' placeholderTextColor="#999999"
                               style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}} placeholder="email"
                               onChangeText={(text) => {
                                   this.setState({email: text})
                               }} keyboardType={'email-address'}/>

                        {/* <Image source={require('../assets/icons/home_next.png')} style={{resizeMode:'contain',width:15*g.rw,height:15*g.rh}}/> */}
                    </Item>
                    <TouchableOpacity style={{marginTop: 40 * g.rh, alignSelf: 'center'}}
                                      onPress={() => requestAnimationFrame(() => {
                                          this.submit()
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
                            }}>{(this.props.lang.content.confirm + "").toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default ForgetPassword;