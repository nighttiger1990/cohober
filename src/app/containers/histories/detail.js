import React, {Component} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../actions';
import moment from 'moment';
import {Button, Content, Header, Left, Right, Title} from 'native-base';

let g = require('../../util');

class DetailHistory extends Component {
    static navigationOptions = () => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        // console.log(this.props.navigation.state.params.id)
        this.props.onFetch(this.props.navigation.state.params.id);
        setTimeout(() => this.setState({isLoading: false}), 3000)
    }

    renderItem(item) {
        console.log(moment(item.createdAt).format('YYYY-MM-DD'));
        return (<View>
            <View style={{height: 55 * g.rh, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../assets/icons/icon_history.png')}
                       style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 20, flex: 1 / 7}}/>
                <View style={{flex: 1}}>
                    <Text style={{
                        fontFamily: 'Roboto-BoldCondensed',
                        color: '#595959',
                        fontSize: 16,
                        flex: 1
                    }}>{item.action === 'FOLLOW' ? "Đã theo dõi " : " "} {item.project.name}</Text>
                    <Text style={{
                        fontFamily: 'Roboto-Regular',
                        color: '#595959',
                        fontSize: 9
                    }}>{moment(item.createdAt).format('YYYY-MM-DD')}</Text>
                </View>

                <Image source={require('../../assets/icons/home_next.png')} style={{
                    flex: 1 / 7,
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    margin: 20,
                    justifyContent: 'flex-end'
                }}/>
            </View>
            <View style={{height: 1, width: g.sw, backgroundColor: '#878787'}}/>
        </View>)
    }

    render() {


        if (this.state.isLoading || this.props.history.isLoading) {
            return (<View style={styles.bgLoading}>
                    <ActivityIndicator
                        color={'#ffca00'}
                        size={'large'}
                        renderToHardwareTextureAndroid={true}
                        animating={true}/>
                </View>
            )
        } else {
            return (<View style={{flex: 1}}>
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
                        fontFamily: 'Roboto-BoldCondensed',
                        backgroundColor: 'rgba(255,255,255,0)'
                    }}>{(this.props.lang.content.detailHistory + "").toUpperCase()}</Title>
                    <Right/>
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
                              numberOfLines={1}>{this.props.history.detail.project.name}</Text></View>

                    <View style={{marginTop: 25 * g.rh, padding: 15 * g.rh}}>
                        <View style={{marginBottom: 20 * g.rh}}>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={1}>{this.props.history.detail.project.detail}</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: '#383838'}}/>
                        <View style={{flexDirection: 'row', marginTop: 15 * g.rh}}>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={1}>{(this.props.lang.content.startDate + ": ")}</Text>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={1}>{moment(this.props.history.detail.project.startDate).format('DD-MM-YYYY')}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={1}>{(this.props.lang.content.endDate + ": ")}</Text>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={1}>{moment(this.props.history.detail.project.endDate).format('DD-MM-YYYY')}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={1}>{(this.props.lang.content.createDate + ": ")}</Text>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959'}}
                                  numberOfLines={1}>{moment(this.props.history.detail.project.createdAt).format('DD-MM-YYYY')}</Text>
                        </View>
                    </View>
                    <View
                        style={{height: 1, backgroundColor: '#383838', marginRight: 15 * g.rw, marginLeft: 15 * g.rw}}/>
                    <View style={{marginTop: 5 * g.rh, padding: 15 * g.rh}}>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Roboto-Condensed', color: '#595959', fontSize: 15,}}
                                  numberOfLines={1}>{this.props.history.detail.action === 'FOLLOW' ? (this.props.lang.content.followed + ':') : ''}</Text>
                            <Text style={{
                                fontFamily: 'Roboto-BoldCondensed',
                                color: '#595959',
                                fontSize: 15,
                                marginLeft: 15 * g.rw
                            }}
                                  numberOfLines={1}>{moment(this.props.history.detail.createdAt).format('DD-MM-YYYY')}</Text>
                        </View>

                    </View>
                </Content>
            </View>)
        }

    }

}

const styles = StyleSheet.create({
    bgLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: g.sw,
        height: g.sh
    },
    txtNoData: {
        fontFamily: 'Roboto-Condensed',
        color: '#383838',
        alignSelf: 'center',
        marginTop: 15 * g.rh,
        opacity: 0.5
    },
    bgHr: {
        height: 35 * g.rh,
        width: g.sw,
        backgroundColor: '#cfcfcf'
    }
});
const mapStateToProps = (state) => {
    return {
        history: state.history,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (id) => dispatch(actions.getHistoryById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHistory);