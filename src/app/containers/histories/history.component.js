import React from "react";
import moment from "moment/moment";
import styles from './history.style';
import {Button, Content, Header, Left, Right, Title} from 'native-base';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import * as g from '../../util';
import Loading from "../components/loading";
import ToolBar from "../components/toolbar";

class History extends React.Component {
    static navigationOptions = {
        // title:'Lịch sử'.toUpperCase(),
        // headerTintColor:'#000',
        // headerStyle:{backgroundColor:'#ffca00'},
        // headerTitleStyle:{fontFamily:'Roboto-BoldCondensed'}
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
        //   console.log(moment(item.createdAt).format('YYYY-MM-DD'))
        return (<TouchableOpacity
            onPress={() => requestAnimationFrame(() => this.props.navigation.navigate('DetailHistory', {id: item.id}))}>
            <View style={{height: 55 * g.rh, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../assets/icons/icon_history.png')}
                       style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 20, flex: 1 / 7}}/>
                <View style={{flex: 1}}>
                    <Text style={{fontFamily: 'Roboto-BoldCondensed', color: '#595959', fontSize: 16}}
                          numberOfLines={1}>{item.action === 'FOLLOW' ? (this.props.lang.content.followed + " ") : " "} {item.project.name}</Text>
                    <Text style={{
                        fontFamily: 'Roboto-Regular',
                        color: '#595959',
                        fontSize: 9
                    }}>{moment(item.createdAt).format('DD-MM-YYYY')}</Text>
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
        </TouchableOpacity>)
    }

    render() {

        if (this.state.isLoading || this.props.history.isLoading) {
            return (<Loading/>)
        } else {
            if (this.props.history.data) {
                return (<View style={styles.container}>

                    <ToolBar imageLeft={require('../../assets/icons/login_back.png')}
                             leftPress={requestAnimationFrame(() => this.props.navigation.goBack())}
                             title={(this.props.lang.content.history + "").toUpperCase()}/>
                    <Content>
                        <View style={styles.bgHr}/>
                        {this.props.history.data.length > 0 ? (<FlatList style={{flex: 1, paddingLeft: 15}}
                                                                         renderItem={({item}) => this.renderItem(item)}
                                                                         data={this.props.history.data}/>) : (
                            <Text style={styles.txtNoData}>{(this.props.lang.content.noData + "")}</Text>)}
                    </Content>
                </View>)
            } else {
                return (<View style={styles.container}>
                    <Text style={styles.txtNoData}>{'Không có lịch sử'}</Text>
                </View>);
            }
        }
    }

}

export default History;