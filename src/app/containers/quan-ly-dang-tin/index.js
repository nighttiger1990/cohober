import React, { Component } from 'react';
import actions from "../../actions";
import { StyleSheet, AsyncStorage } from "react-native";
import * as g from '../../util';
import Toast from 'react-native-toast-native';
import { Content } from 'native-base';
import TypeFunction from '../components/typeFunctions/type';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import { connect } from 'react-redux';
import reactotronReactNative from 'reactotron-react-native';
import { fetchMyProject } from '../../actions/quan-ly-dang-tin';
import Loading from '../components/loading';
const data = [
    {
        type: 'idea',
        name: 'xxxxx'
    },
    {
        type: 'raiseFunding',
        name: 'xxxxx'
    },
    {
        type: 'docu',
        name: 'xxxxx'
    },
    {
        type: 'idea',
        name: 'xxxxx'
    }
];
class QuanLyDangTin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeVisiable: false
        }
    }

    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        AsyncStorage.getItem("token", (err, result) => {
            if (err) {
                reactotronReactNative.log("err get token QLDT", err);
                return;
            } else {
                let axios = {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": result,
                        "Accept": "application/json"
                    },
                    method: 'GET',
                    url: "http://api.cohober.vn/myproject"
                }
                this.props.getMyProject(axios)
            }
        })
    }
    renderTitle() {
        const data = this.props.lang.content;
        let title = "";
        Object.keys(data).map(() => {
            if (data.hasOwnProperty(this.props.functions.type)) {
                title = data[this.props.functions.type];
            }
        });
        return title;
    }
    imageMaker(type) {
        console.log("type", type)
        switch (type) {
            case "idea":
                return require('../../assets/icons/icon_light.png');
                break;
            case "raiseFunding":
                return require('../../assets/icons/icon_money2.png');
                break;
            case "docu":
                return require('../../assets/icons/iconsh_circle.png');
                break;
            default:
                return require('../../assets/icons/iconbds_circle.png')
                break;
        }
    }
    goToDetail(id) {
        this.props.navigation.navigate('ProjectDetail', { id: id });
    }

    renderItem(item) {
        return (
            <TouchableOpacity style={{ paddingLeft: 15 * g.rw }} onPress={() => this.goToDetail(item.id)}>
                <View style={{ height: 55 * g.rh, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={this.imageMaker(item.type)}
                        style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 20, flex: 1 / 7 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.namItem} numberOfLines={1}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                style={{ width: 10 * g.rw, height: 10 * g.rh, resizeMode: 'contain' }}
                                source={require('../../assets/icons/pin.png')} />
                            <Text style={styles.textViTri}>vị trí khoảng cách</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1 / 7, width: 20, height: 20, margin: 20, justifyContent: 'flex-end' }} />
                </View>
                <View style={{ height: 1, width: g.sw, backgroundColor: '#878787' }} />
            </TouchableOpacity>
        )
    }

    render() {
        reactotronReactNative.log("xxx", this.props);
        let { isLoading, isLoaded, data } = this.props.myproject;
        if (isLoading === true) return <Loading/>
        return (
            <View style={styles.container}>
                <Header
                    showType={() => this.setState({ typeVisiable: !this.state.typeVisiable })}
                    typeVisible={this.state.typeVisible}
                    navigation={this.props.navigation}
                    title={this.renderTitle()}
                />
                <Content>
                    <View style={styles.bgHr} />
                    <FlatList
                        style={{ flex: 1, paddingLeft: 15 * g.rw, marginBottom: 28 * g.rh }}
                        renderItem={item => this.renderItem(item.item)}
                        data={data}
                        shouldRasterizeIOS={true}
                        renderToHardwareTextureAndroid={true}
                        keyExtractor={item => item.id}
                    />
                </Content>

                {
                    this.state.typeVisiable && <TypeFunction txtIdea={this.props.lang.content.idea}
                        txtRaiseFunding={this.props.lang.content.raiseFunding}
                        txtRealEstale={this.props.lang.content.realEstale}
                        txtSecondHand={this.props.lang.content.secondHand}
                        getListProject={this.props.onFetch}
                        onChangeFunction={this.props.onChangeFunction}
                        currentFunction={this.props.functions.type}
                        typeFunctionVisible={(res) => this.setState({ typeVisiable: res })} />
                }
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang,
        functions: state.functions,
        myproject: state.myproject
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (type) => dispatch(actions.getProjectByIdUser(type)),
        getMyProject: (axios) => dispatch(fetchMyProject(axios))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDangTin);
const styles = StyleSheet.create({
    container: {
        width: g.sw,
        height: g.sh,
    },
    nameItem: {
        fontFamily: 'Roboto-BoldCondensed',
        color: '#595959',
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    textViTri: {
        fontFamily: 'Roboto-Regular',
        backgroundColor: 'transparent',
        color: '#595959',
        fontSize: 9
    }

})