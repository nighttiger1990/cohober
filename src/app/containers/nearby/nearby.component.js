import React from "react";
import { Body, Button, Content, Header, Left, Right, Segment, Title } from 'native-base';
import Toast from 'react-native-toast-native';
import TypeFunction from '../components/typeFunctions/type';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './nearby.style';
import * as g from '../../util';
import reactotronReactNative from "reactotron-react-native";
import Loading from "../components/loading";

export default class NearBy extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            location: [],
            isLoading: true,
            typeFunctionVisible: false
        },
            this.onlyLoading = 1;
    }

    componentDidMount() {
        this.getData();
        this.onlyLoading = 2;
    }
    imageMaker(type) {
        if (type === 'idea') {
            return require('../../assets/icons/icon_light.png');
        } else if (type === 'raiseFunding') {
            return require('../../assets/icons/icon_money2.png');
        } else if (type === 'docu') {
            return require('../../assets/icons/iconsh_circle.png')
        } else {
            return require('../../assets/icons/iconbds_circle.png')
        }
    }
    renderItem({ item }, navigation) {
        return (
            <TouchableOpacity style={{ paddingLeft: 15 * g.rw }}
                onPress={() => navigation.navigate('ProjectDetail', { id: item.id })}>
                <View style={{ height: 55 * g.rh, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={this.imageMaker(item.type)}
                        style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 20, flex: 1 / 7 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            fontFamily: 'Roboto-BoldCondensed',
                            color: '#595959',
                            fontSize: 16,
                            backgroundColor: 'transparent'
                        }} numberOfLines={1}>
                            {item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 10 * g.rw, height: 10 * g.rh, resizeMode: 'contain' }}
                                source={require('../../assets/icons/pin.png')} />
                            <Text style={{
                                fontFamily: 'Roboto-Regular',
                                backgroundColor: 'transparent',
                                color: '#595959',
                                fontSize: 9
                            }}>
                                {this.measure(this.state.location[1], this.state.location[0], item.location.coordinates[1], item.location.coordinates[0]) ? (this.measure(this.state.location[1], this.state.location[0], item.location.coordinates[1], item.location.coordinates[0])) : " "}
                            </Text>
                        </View>

                    </View>
                    <View style={{ flex: 1 / 7, width: 20, height: 20, margin: 20, justifyContent: 'flex-end' }} />

                </View>
                <View style={{ height: 1, width: g.sw, backgroundColor: '#878787' }} />
            </TouchableOpacity>)
    }
    getData() {
        try {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lnglat = {
                        1: position.coords.longitude,
                        2: position.coords.latitude,
                    };
                    this.state.location = Object.values(lnglat);
                    this.props.onFetch(this.props.functions.type);
                },
                (error) => Toast.show(this.props.lang.content.checkLocation + "", Toast.SHORT, Toast.TOP, {
                    height: 50,
                    width: 400,
                    backgroundColor: '#ffca00',
                    opacity: 0.5,
                    textAlign: 'center',
                    lines: 1,
                    borderRadius: 3
                })
            );

        } catch (error) {
            console.log(error)
        }
    }
    componentWillUnMount() {
        navigator.geolocation.stopObserving();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.functions !== this.props.functions) return false;
        return true
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
    renderContent() {
        let { isLoadingNear, isLoadedNear } = this.props.project;
        if (isLoadingNear === true && isLoadedNear === false) return <Content><Loading /></Content>

        if (this.props.project.nearby.length > 0) {
            return (
                <Content>
                    <View style={styles.bgHr} />
                    <FlatList
                        style={{ flex: 1, paddingLeft: 15 * g.rw, marginBottom: 28 * g.rh }}
                        renderItem={item => this.renderItem(item, this.props.navigation)}
                        data={this.props.project.nearby}
                        refreshing={this.props.project.isLoading}
                        onRefresh={() => this.getData()}
                        shouldRasterizeIOS={true}
                        renderToHardwareTextureAndroid={true}
                        keyExtractor={item => item.id}
                    />
                </Content>
            )
        } else {
            return (
                <Content>
                    <Text style={styles.txtNoData}>{this.props.lang.content.noData + " "}</Text>
                    <TouchableOpacity
                        style={styles1.touchable1}
                        onPress={() => requestAnimationFrame(() => this.getData())}
                    >
                        <Text style={styles1.text1}>{this.props.lang.type === 'vi' ? "thử lại" : 'retry'.toUpperCase()}</Text>
                    </TouchableOpacity>

                </Content>
            )
        }
    }

    render() {
        const { isLoadingNear, isLoadedNear } = this.props.project;
        const data = this.props.lang.content;
        let title = "";
        Object.keys(data).map(() => {
            if (data.hasOwnProperty(this.props.functions.type)) {
                title = data[this.props.functions.type];
                //do something with value;
            }
        });
        if (isLoadingNear === true && isLoadedNear === false && this.onlyLoading === 1) return <View><Loading /></View>
        return (
            <View style={styles.container}>
                <Header style={{ backgroundColor: '#ffca00', height: 72 * g.rh }} androidStatusBarColor="#ffca00">
                    <Left>
                        <Button transparent delayLongPress={500} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image style={{ width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain' }}
                                source={require('../../assets/icons/login_back.png')} />
                        </Button>
                    </Left>
                    <Body style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }}
                            onPress={() => this.setState({ typeFunctionVisible: !this.state.typeFunctionVisible })}>
                            <Title style={[{
                                fontSize: 18,
                                fontFamily: 'Roboto-BoldCondensed',
                                color: '#383838',
                                alignSelf: 'center'
                            }]}
                            >{(title + "").toUpperCase()}</Title>
                            <Image style={{
                                resizeMode: 'contain',
                                width: 15,
                                height: 15,
                                alignSelf: 'center',
                                marginLeft: 5
                            }}
                                source={this.state.typeFunctionVisible ? require('../../assets/icons/arrow_dropdown.png') : require('../../assets/icons/arrow_dropup.png')} />
                        </TouchableOpacity>
                    </Body>

                    <Right />
                </Header>
                {this.renderContent()}
                {/* {
                    (this.props.project.nearby.length > 0) ?
                        (
                            <Content>
                                <View style={styles.bgHr} />
                                <FlatList
                                    style={{ flex: 1, paddingLeft: 15 * g.rw, marginBottom: 28 * g.rh }}
                                    renderItem={item => this.renderItem(item, this.props.navigation)}
                                    data={this.props.project.nearby}
                                    refreshing={this.props.project.isLoading}
                                    onRefresh={() => this.getData()}
                                    shouldRasterizeIOS={true}
                                    renderToHardwareTextureAndroid={true}
                                    keyExtractor={item => item.id}
                                />
                            </Content>
                        ) : (
                            <Content>
                                <Text style={styles.txtNoData}>{this.props.lang.content.noData + " "}</Text>
                                <TouchableOpacity
                                    style={styles1.touchable1}
                                    onPress={() => requestAnimationFrame(() => this.getData())}
                                >
                                    <Text style={styles1.text1}>{this.props.lang.type === 'vi' ? "thử lại" : 'retry'.toUpperCase()}</Text>
                                </TouchableOpacity>

                            </Content>
                        )
                } */}
                {this.state.typeFunctionVisible && <TypeFunction txtIdea={this.props.lang.content.idea}
                    txtRaiseFunding={this.props.lang.content.raiseFunding}
                    txtRealEstale={this.props.lang.content.realEstale}
                    txtSecondHand={this.props.lang.content.secondHand}
                    getListProject={(type) => this.props.onFetch(type)}
                    onChangeFunction={this.props.onChangeFunction}
                    currentFunction={this.props.functions.type}
                    typeFunctionVisible={(res) => this.setState({ typeFunctionVisible: res })} />}
            </View>
        )
    }
}
const styles1 = {
    touchable1: {
        marginTop: 15 * g.rh,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d86b00',
        borderRadius: 8 * (g.rh + g.rw),
        height: 25 * g.rh,
        width: 65 * g.rw
    },
    text1: {
        backgroundColor: 'transparent',
        fontFamily: 'Roboto-Condensed',
        color: '#fff',
        textAlign: 'center',
        fontSize: 10 * g.rh
    }
}

