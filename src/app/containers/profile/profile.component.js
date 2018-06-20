import React from "react";
import styles from './profile.style';
import {Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Right, Title} from 'native-base'
import {ActivityIndicator, Image, KeyboardAvoidingView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import * as g from '../../util';
import HComponent from "../common/HComponent";

class Profile extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: null,
            password: null,
            phoneNumber: null,
            edit_status: false,
            avatar: null,
            name: ""
        }
    }

    componentDidMount() {
        this.props.onProfile();
        setTimeout(() => this.setState({isLoading: false}), 3000);
        if (this.props.user) {
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.user.info);
        console.log(nextProps.user.info)
    }

    updateProfile() {
        let data = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            avatar: this.state.avatar
        };
        this.props.onUpdate(data);
    }

    render() {
        if (this.state.isLoading || this.props.user.isLoading) {
            return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    color={'#ffca00'}
                    size={'large'}
                    renderToHardwareTextureAndroid={true}/>
            </View>)
        } else {
            return (
                <View>
                    <StatusBar backgroundColor={'#ffca00'} barStyle={'dark-content'}/>
                    <View style={{width: g.sw, height: g.sh, backgroundColor: '#fff'}}>
                        <Container>
                            <Header style={{backgroundColor: '#ffca00'}} androidStatusBarColor="#ffca00">
                                <Left>
                                    <Button transparent delayLongPress={500}
                                            onPress={() => requestAnimationFrame(() => {
                                                this.props.navigation.goBack()
                                            })}>
                                        <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain'}}
                                               source={require('../../assets/icons/login_back.png')}/>
                                    </Button>
                                </Left>
                                <Title style={{
                                    alignSelf: 'center',
                                    color: '#383838',
                                    fontFamily: 'Roboto-BoldCondensed'
                                }}>{this.state.edit_status ? (this.props.lang.content.editProfile + "").toUpperCase() : (this.props.lang.content.profile + "").toUpperCase()}</Title>
                                <Right>
                                    <Button transparent delayLongPress={800}
                                            onPress={() => requestAnimationFrame(() => {
                                                this.setState({edit_status: !this.state.edit_status})
                                            })}>
                                        <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'stretch'}}
                                               source={require('../../assets/icons/icon_edit.png')}/>
                                    </Button>
                                </Right>
                            </Header>
                            <KeyboardAvoidingView style={{width: g.sw, height: g.sh,}}>
                                <Content>
                                    <View style={{
                                        borderRadius: 8 * (g.rh + g.rw),
                                        backgroundColor: '#ffca00',
                                        marginTop: 20 * g.rh,
                                        width: 140 * g.rw,
                                        height: 140 * g.rh,
                                        alignSelf: 'center'
                                    }}>
                                        {/* <Image style={{width:120*g.rw,height:120*g.rh,margin:10,resizeMode:'stretch',alignSelf:'center',backgroundColor:'rgba(255,255,255,0)',borderRadius:8*(g.rh+g.rw),borderColor:'#000'}} source={require('../assets/image/avatar2.png')} /> */}
                                        {
                                            this.state.avatar ? (<Image source={{uri: this.state.avatar}} style={{
                                                    width: 120 * g.rw,
                                                    height: 120 * g.rh,
                                                    margin: 10,
                                                    resizeMode: 'stretch',
                                                    alignSelf: 'center',
                                                    backgroundColor: 'rgba(255,255,255,0)',
                                                    borderRadius: 8 * (g.rh + g.rw),
                                                    borderColor: '#000'
                                                }}/>
                                            ) : (<Image source={require('../../assets/image/avatar2.png')} style={{
                                                width: 120 * g.rw,
                                                height: 120 * g.rh,
                                                margin: 10,
                                                resizeMode: 'stretch',
                                                alignSelf: 'center',
                                                backgroundColor: 'rgba(255,255,255,0)',
                                                borderRadius: 8 * (g.rh + g.rw),
                                                borderColor: '#000'
                                            }}/>)
                                        }
                                    </View>
                                    <Form style={{marginTop: 25 * g.rh, width: g.sw - 70 * g.rw, alignSelf: 'center'}}>
                                        {
                                            !this.state.edit_status ? (
                                                <Item style={[styles.input, {
                                                    backgroundColor: 'rgba(255,255,255,0)',
                                                    borderColor: 'rgba(255,255,255,0)'
                                                }]} regular>
                                                    <Image source={require('../../assets/icons/login_account.png')}
                                                           style={{
                                                               resizeMode: 'contain',
                                                               width: 30 * g.rw,
                                                               height: 30 * g.rh
                                                           }}/>
                                                    <Input disabled={!this.state.edit_status}
                                                           autoFocus={this.state.edit_status} numberOfLines={1}
                                                           placeholderTextColor="#595959"
                                                           style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                                           value={this.state.name ? this.state.name + "" : null}
                                                           onChangeText={(text) => {
                                                               this.setState({name: text})
                                                           }}/>
                                                    {
                                                        this.state.edit_status ? (
                                                            <Image source={require('../../assets/icons/home_next.png')}
                                                                   style={{
                                                                       resizeMode: 'contain',
                                                                       width: 15 * g.rw,
                                                                       height: 15 * g.rh
                                                                   }}/>) : (
                                                            <View style={{width: 15 * g.rw, height: 15 * g.rh}}/>)
                                                    }
                                                </Item>

                                            ) : (
                                                <Item style={styles.input} regular>
                                                    <Image source={require('../../assets/icons/login_account.png')}
                                                           style={{
                                                               resizeMode: 'contain',
                                                               width: 30 * g.rw,
                                                               height: 30 * g.rh
                                                           }}/>
                                                    <Input disabled={!this.state.edit_status}
                                                           autoFocus={this.state.edit_status} numberOfLines={1}
                                                           placeholderTextColor="#595959"
                                                           style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                                           placeholder={(this.props.lang.content.fullName + "").toLowerCase()}
                                                           value={this.state.name ? this.state.name + "" : null}
                                                           onChangeText={(text) => {
                                                               this.setState({name: text})
                                                           }}/>
                                                    {
                                                        this.state.edit_status ? (
                                                            <Image source={require('../../assets/icons/home_next.png')}
                                                                   style={{
                                                                       resizeMode: 'contain',
                                                                       width: 15 * g.rw,
                                                                       height: 15 * g.rh
                                                                   }}/>) : (
                                                            <View style={{width: 15 * g.rw, height: 15 * g.rh}}/>)
                                                    }
                                                </Item>
                                            )
                                        }
                                        {
                                            !this.state.edit_status ? (
                                                <Item style={[styles.input, {
                                                    marginTop: 10 * g.rh,
                                                    backgroundColor: 'rgba(255,255,255,0)',
                                                    borderColor: 'rgba(255,255,255,0)'
                                                }]} regular>
                                                    <Image source={require('../../assets/icons/login_account.png')}
                                                           style={{
                                                               resizeMode: 'contain',
                                                               width: 30 * g.rw,
                                                               height: 30 * g.rh
                                                           }}/>
                                                    <Input disabled={!this.state.edit_status}
                                                           autoFocus={this.state.edit_status} numberOfLines={1}
                                                           placeholderTextColor="#595959"
                                                           style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                                           value={this.state.email ? this.state.email + "" : null}
                                                           onChangeText={(text) => {
                                                               this.setState({email: text})
                                                           }} keyboardType="email-address"/>
                                                    {
                                                        this.state.edit_status ? (
                                                            <Image source={require('../../assets/icons/home_next.png')}
                                                                   style={{
                                                                       resizeMode: 'contain',
                                                                       width: 15 * g.rw,
                                                                       height: 15 * g.rh
                                                                   }}/>) : (
                                                            <View style={{width: 15 * g.rw, height: 15 * g.rh}}/>)
                                                    }
                                                </Item>
                                            ) : (
                                                <Item style={[styles.input, {marginTop: 10 * g.rh}]} regular>
                                                    <Image source={require('../../assets/icons/login_account.png')}
                                                           style={{
                                                               resizeMode: 'contain',
                                                               width: 30 * g.rw,
                                                               height: 30 * g.rh
                                                           }}/>
                                                    <Input disabled={!this.state.edit_status}
                                                           autoFocus={this.state.edit_status} numberOfLines={1}
                                                           placeholderTextColor="#595959"
                                                           style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                                           placeholder="Email"
                                                           value={this.state.email ? this.state.email + "" : null}
                                                           onChangeText={(text) => {
                                                               this.setState({email: text})
                                                           }} keyboardType="email-address"/>
                                                    {
                                                        this.state.edit_status ? (
                                                            <Image source={require('../../assets/icons/home_next.png')}
                                                                   style={{
                                                                       resizeMode: 'contain',
                                                                       width: 15 * g.rw,
                                                                       height: 15 * g.rh
                                                                   }}/>) : (
                                                            <View style={{width: 15 * g.rw, height: 15 * g.rh}}/>)
                                                    }
                                                </Item>
                                            )
                                        }

                                        {
                                            !this.state.edit_status ? (<Item style={[styles.input, {
                                                marginTop: 10 * g.rh,
                                                borderColor: 'rgba(255,255,255,0)',
                                                backgroundColor: 'rgba(255,255,255,0)'
                                            }]} regular>
                                                <Image source={require('../../assets/icons/login_phone.png')} style={{
                                                    resizeMode: 'contain',
                                                    width: 30 * g.rw,
                                                    height: 30 * g.rh
                                                }}/>
                                                <Input disabled={!this.state.edit_status} placeholderTextColor="#595959"
                                                       style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                                       keyboardType={'phone-pad'}
                                                       value={this.state.phoneNumber ? this.state.phoneNumber + "" : null}
                                                       onChangeText={(text) => {
                                                           this.setState({phoneNumber: text})
                                                       }} returnKeyType={'done'} returnKeyLabel={'xong'}/>
                                                {
                                                    this.state.edit_status ? (
                                                        <Image source={require('../../assets/icons/home_next.png')}
                                                               style={{
                                                                   resizeMode: 'contain',
                                                                   width: 15 * g.rw,
                                                                   height: 15 * g.rh
                                                               }}/>) : (
                                                        <View style={{width: 15 * g.rw, height: 15 * g.rh}}/>)
                                                }
                                            </Item>) : (
                                                <Item style={[styles.input, {marginTop: 10 * g.rh}]} regular>
                                                    <Image source={require('../../assets/icons/login_phone.png')}
                                                           style={{
                                                               resizeMode: 'contain',
                                                               width: 30 * g.rw,
                                                               height: 30 * g.rh
                                                           }}/>
                                                    <Input disabled={!this.state.edit_status}
                                                           placeholderTextColor="#595959"
                                                           style={{fontFamily: 'Roboto-Condensed', textAlign: 'center'}}
                                                           placeholder={(this.props.lang.content.phone + "").toLowerCase()}
                                                           keyboardType={'phone-pad'}
                                                           value={this.state.phoneNumber ? this.state.phoneNumber + "" : null}
                                                           onChangeText={(text) => {
                                                               this.setState({phoneNumber: text})
                                                           }} returnKeyType={'done'} returnKeyLabel={'xong'}/>
                                                    {
                                                        this.state.edit_status ? (
                                                            <Image source={require('../../assets/icons/home_next.png')}
                                                                   style={{
                                                                       resizeMode: 'contain',
                                                                       width: 15 * g.rw,
                                                                       height: 15 * g.rh
                                                                   }}/>) : (
                                                            <View style={{width: 15 * g.rw, height: 15 * g.rh}}/>)
                                                    }
                                                </Item>)
                                        }
                                        {
                                            this.state.edit_status ? (
                                                <TouchableOpacity onPress={() => requestAnimationFrame(() => {
                                                    this.updateProfile()
                                                })}>
                                                    <View style={{
                                                        backgroundColor: '#ffca00',
                                                        width: g.sw - 70 * g.rw,
                                                        height: 50 * g.rh,
                                                        borderRadius: 3 * (g.rh + g.rw),
                                                        marginTop: 100 * g.rh,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Text style={{
                                                            fontFamily: 'Roboto-BoldCondensed',
                                                            fontSize: 18,
                                                            color: '#000',
                                                            flex: 1,
                                                            textAlign: 'center'
                                                        }}>{(this.props.lang.content.update + "").toUpperCase()}</Text>
                                                    </View>
                                                </TouchableOpacity>) : (<View>
                                                <TouchableOpacity style={{marginTop: 30 * g.rh}} onPress={() => {
                                                    this.props.navigation.navigate('UpdatePassword')
                                                }}>
                                                    <View>
                                                        <Text style={{
                                                            textAlign: 'center',
                                                            fontFamily: 'Roboto-Bold',
                                                            fontSize: 16,
                                                            color: '#000'
                                                        }}>{(this.props.lang.content.updatePass + "")}</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>)
                                        }

                                    </Form>

                                </Content>

                            </KeyboardAvoidingView>
                        </Container>
                    </View>
                </View>
            );
        }
    }
}

export default Profile;