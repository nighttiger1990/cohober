import React, { Component } from 'react';
import actions from "../../actions";
import { StyleSheet, AsyncStorage, ActivityIndicator, Dimensions, StatusBar } from "react-native";
import * as g from '../../util';
import { Content } from 'native-base';
import TypeFunction from '../components/typeFunctions/type';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import { connect } from 'react-redux';
import reactotronReactNative from 'reactotron-react-native';
import { fetchMyProject, deleteProject } from '../../actions/quan-ly-dang-tin';
import Loading from '../components/loading';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const ITEM_HEIGHT = 55 * g.rh + 1;
class QuanLyDangTin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeVisiable: false,
            bds: [],
            idea: [],
            docu: [],
            goivon: [],
            location: [],
        }
        this.fixLoadMoreFirst = 0;

    }

    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        reactotronReactNative.log("componentDidMount");
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lnglat = {
                        1: position.coords.longitude,
                        2: position.coords.latitude,
                    };
                    this.state.location = Object.values(lnglat);
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
                },
                (error) => reactotronReactNative.log(this.props.lang.content.checkLocation + "")
            );

        } catch (error) {
            console.log(error)
        }

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
    componentWillUnMount() {
        reactotronReactNative.log("un mount");
        navigator.geolocation.stopObserving();
        this.props.deleteProject();
    }
    componentWillReceiveProps(nextProps) {
        reactotronReactNative.log("componentWillReceiveProps", nextProps.myproject);
        if (nextProps.myproject.data === null) return;
        if (nextProps.myproject.data !== this.props.myproject.data) {
            this.state.bds = [...this.state.bds, ...nextProps.myproject.bds.slice(0, 15)];
            this.state.goivon = [...this.state.goivon, ...nextProps.myproject.goivon.slice(0, 15)];
            this.state.idea = [...this.state.idea, ...nextProps.myproject.idea.slice(0, 15)];
            this.state.docu = [...this.state.docu, ...nextProps.myproject.docu.slice(0, 15)];
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        reactotronReactNative.log("shouldComponentUpdate", Object.keys(nextProps.myproject).filter(k => nextProps.myproject[k] !== this.props.myproject[k]))


        return true
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
                            <Text style={styles.textViTri}>
                                {this.measure(this.state.location[1], this.state.location[0], item.location.coordinates[1], item.location.coordinates[0]) ? (this.measure(this.state.location[1], this.state.location[0], item.location.coordinates[1], item.location.coordinates[0])) : " "}
                            </Text>
                        </View>

                    </View>
                    <View style={{ flex: 1 / 7, width: 20, height: 20, margin: 20, justifyContent: 'flex-end' }} />
                </View>
                <View style={{ height: 1, width: g.sw, backgroundColor: '#878787' }} />
            </TouchableOpacity>
        )
    }
    getData() {
        switch (this.props.functions.type) {
            case "idea":
                return this.state.idea
            case "raiseFunding":
                return this.state.goivon
            case "docu":
                return this.state.docu
            default:
                return this.state.bds
        }
    }

    handleLoadMore = () => {
        let { idea, docu, goivon, bds } = this.state;
        let myproject = this.props.myproject;
        switch (this.props.functions.type) {
            case "idea":
                if (idea.length < myproject.idea.length) {
                    this.setState({
                        idea: [...idea, ...myproject.idea.slice(idea.length, idea.length + 15)],
                    });
                }
                break;
            case "raiseFunding":
                if (goivon.length < myproject.goivon.length) {
                    this.setState({
                        goivon: [...goivon, ...myproject.goivon.slice(goivon.length, goivon.length + 15)],
                    });
                }
                break;
            case "docu":
                if (docu.length < myproject.docu.length) {
                    this.setState({
                        docu: [...idea, ...myproject.docu.slice(docu.length, docu.length + 15)],
                    });
                }
                break;
            default:
                reactotronReactNative.log("www", this.state.bds.length);
                if (bds.length < myproject.bds.length) {
                    this.setState({
                        bds: [...bds, ...myproject.bds.slice(bds.length, bds.length + 2)],
                    });
                }
                break;
        }
    }
    measure(lat1, lon1, lat2, lon2) {
        const R = 6378.137;
        const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        if (Math.round(d) > 1) {
            return Math.round(d) + "Km"; // meters
        } else if (Math.round(d * 1000) > 1) {
            return Math.round(d * 1000) + "m"
        } else {
            return "0m"
        }
    }
    render() {
        if (this.props.myproject.data === null) {
            return <Loading />
        } else {
            let data = this.getData();
            return (
                <View style={styles.container}>
                    <Header
                        showType={() => this.setState({ typeVisiable: !this.state.typeVisiable })}
                        navigation={this.props.navigation}
                        title={this.renderTitle()}
                        goBack={() => {
                            this.props.navigation.goBack();
                            this.props.deleteProject();
                        }}
                    />

                    <View style={{ width: width, height: height - 72 * g.rh - StatusBar.currentHeight }}>
                        <FlatList
                            renderItem={item => this.renderItem(item.item)}
                            data={data}
                            shouldRasterizeIOS={true}
                            renderToHardwareTextureAndroid={true}
                            keyExtractor={item => item.id}
                            getItemLayout={(data, index) => (
                                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                            )}
                            onEndReached={() => this.handleLoadMore()}
                            onEndReachedThreshold={0.1}
                            bounces={false}
                        />
                    </View>


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
        getMyProject: (axios) => dispatch(fetchMyProject(axios)),
        deleteProject: () => dispatch(deleteProject())
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