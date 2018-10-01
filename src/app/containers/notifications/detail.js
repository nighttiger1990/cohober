import React, {Component} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../actions';
import {Button, Content, Header, Left, Right, Title} from 'native-base';
import moment from 'moment';

let g = require('../../util');

class DetailNotification extends Component {
    static navigationOptions = () => ({
        //     title:'Chi tiết Thông báo'.toUpperCase(),
        //     headerTintColor:'#000',
        //     headerStyle:{backgroundColor:'#ffca00'},
        //     headerTitleStyle:{fontFamily:'Roboto-BoldCondensed'},
        //     headerLeft:<TouchableOpacity onPress={()=>requestAnimationFrame(()=>navigation.goBack())}>
        //     <Image style={{width:25*g.rw,height:25*g.rh,resizeMode:'contain'}} source={require('../../assets/icons/login_back.png')}/>
        // </TouchableOpacity>
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.onGetDetail(this.props.navigation.state.params.id);
        setTimeout(() => this.setState({isLoading: false}), 3000)

    }

    renderItem(item) {

    }

    render() {
        if (this.state.isLoading || this.props.notification.isLoading) {
            return (<View style={styles.bgLoading}>
                    <ActivityIndicator
                        color={'#ffca00'}
                        size={'large'}
                        renderToHardwareTextureAndroid={true}
                        animating={true}/>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <Header style={{backgroundColor: '#ffca00'}} androidStatusBarColor="#ffca00">
                        <Left>
                            <Button transparent delayLongPress={500} onPress={() => requestAnimationFrame(() => {
                                this.props.navigation.goBack()
                            })}>
                                <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain'}}
                                       source={require('../../assets/icons/login_back.png')}/>
                            </Button>
                        </Left>
                        <Title style={{
                            alignSelf: 'center',
                            color: '#383838',
                            fontFamily: 'Roboto-BoldCondensed',
                            backgroundColor: 'rgba(255,255,255,0)'
                        }}>{(this.props.lang.content.detailNotify + "").toUpperCase()}</Title>
                        <Right>

                        </Right>
                    </Header>
                    <Content>
                        <View style={{
                            height: 35 * g.rh,
                            width: g.sw,
                            backgroundColor: '#cfcfcf',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{fontFamily: 'Roboto-BoldCondensed', color: '#595959'}}
                                  numberOfLines={1}>{this.props.notification.detail.project.name}</Text></View>
                        <View style={{marginTop: 25 * g.rh, padding: 15 * g.rh}}>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={5}>{this.props.notification.detail.project.detail}</Text>
                            <View style={{flexDirection: 'row', marginTop: 15 * g.rh}}>
                                <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                      numberOfLines={1}>{(this.props.lang.content.startDate + ": ")}</Text>
                                <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                      numberOfLines={1}>{moment(this.props.notification.detail.project.startDate).format('DD-MM-YYYY')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                      numberOfLines={1}>{(this.props.lang.content.endDate + ": ")}</Text>
                                <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                      numberOfLines={1}>{moment(this.props.notification.detail.project.endDate).format('DD-MM-YYYY')}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                      numberOfLines={1}>{(this.props.lang.content.createDate + ": ")}</Text>
                                <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                      numberOfLines={1}>{moment(this.props.notification.detail.project.createdAt).format('DD-MM-YYYY')}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: '#383838',
                                marginRight: 15 * g.rw,
                                marginLeft: 15 * g.rw
                            }}/>
                        <View style={{marginTop: 5 * g.rh, padding: 15 * g.rh}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/icons/login_account.png')}
                                       style={{resizeMode: 'contain', width: 15 * g.rw, height: 30 * g.rh}}/>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontSize: 15,
                                    marginLeft: 15 * g.rw
                                }}
                                      numberOfLines={1}>{(this.props.notification.detail.fromUser.name).toUpperCase()}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/icons/login_account.png')}
                                       style={{resizeMode: 'contain', width: 15 * g.rw, height: 30 * g.rh}}/>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontSize: 15,
                                    marginLeft: 15 * g.rw
                                }} numberOfLines={1}>{(this.props.notification.detail.fromUser.email)}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/icons/login_phone.png')}
                                       style={{resizeMode: 'contain', width: 15 * g.rw, height: 30 * g.rh}}/>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontSize: 15,
                                    marginLeft: 15 * g.rw
                                }} numberOfLines={1}>{(this.props.notification.detail.fromUser.phoneNumber)}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959', fontSize: 15,}}
                                      numberOfLines={1}>{this.props.notification.detail.action === 'FOLLOW' ? (this.props.lang.content.followed + ':') : ''}</Text>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontSize: 15,
                                    marginLeft: 15 * g.rw
                                }}
                                      numberOfLines={1}>{moment(this.props.notification.detail.createdAt).format('DD-MM-YYYY')}</Text>
                            </View>

                        </View>
                    </Content>
                </View>

            );
        }
    }

}

const styles = StyleSheet.create({
    bgLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetDetail: (id) => dispatch(actions.getNotificationById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailNotification);