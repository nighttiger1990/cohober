import HComponent from "../common/HComponent";
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './notification.style';
import React from "react";
import {} from 'native-base';
import * as g from '../../util';
import {Header} from "native-base";
import {Left} from "native-base";
import {Button} from "native-base";
import {Title} from "native-base";
import {Right} from "native-base";
import {Content} from "native-base";

export default class Notification extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.onFetch();
        setTimeout(() => this.setState({isLoading: false}), 3000)
    }

    renderItem(item) {
        return (<View>
            <TouchableOpacity style={{height: 55 * g.rh, flexDirection: 'row', alignItems: 'center', flex: 1}}
                              onPress={() => requestAnimationFrame(() => this.props.navigation.navigate('DetailNotification', {id: item.id}))}>
                <Image source={require('../../assets/icons/icon_bell.png')}
                       style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 20, flex: 1 / 7}}/>
                <Text style={{
                    fontFamily: item.isRead ? 'Roboto-Condensed' : 'Roboto-BoldCondensed',
                    color: '#595959',
                    fontSize: 16,
                    flex: 1,
                    marginLeft: 10
                }}
                      numberOfLines={2}> {item.action === 'FOLLOW' ? (this.props.lang.content.followed + " ") : " "} {item.project.name}</Text>
                <Image source={require('../../assets/icons/home_next.png')} style={{
                    flex: 1 / 7,
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    margin: 20,
                    justifyContent: 'flex-end'
                }}/>
            </TouchableOpacity>
            <View style={{height: 1, width: g.sw, backgroundColor: '#878787'}}/>
        </View>)
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
            if (this.props.notification.data) {
                return (
                    <View style={styles.container}>
                        <Header style={{backgroundColor: '#ffca00'}} androidStatusBarColor="#ffca00">
                            <Left>
                                <Button transparent delayLongPress={500} onPress={() => {
                                    this.props.navigation.goBack()
                                }}>
                                    <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain'}}
                                           source={require('../../assets/icons/login_back.png')}/>
                                </Button>
                            </Left>
                            <Title style={{
                                alignSelf: 'center',
                                color: '#383838',
                                fontFamily: 'Roboto-BoldCondensed'
                            }}>{(this.props.lang.content.notification + "").toUpperCase()}</Title>
                            <Right/>
                        </Header>
                        <Content>
                            <View style={styles.bgHr}/>
                            {this.props.notification.data.length > 0 ? (<FlatList style={{flex: 1, paddingLeft: 15}}
                                                                                  renderItem={({item}) => this.renderItem(item)}
                                                                                  data={this.props.notification.data}/>) : (
                                <Text style={styles.txtNoData}>{(this.props.lang.content.noData + "")}</Text>)
                            }
                        </Content>
                    </View>);
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={styles.txtNoData}>{'Không có thông báo'}</Text>
                    </View>);
            }
        }

    }

}