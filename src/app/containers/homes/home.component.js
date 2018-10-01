import React from 'react';
import { ActivityIndicator, Image, Linking, StatusBar, TouchableOpacity, View, LayoutAnimation, DeviceEventEmitter  } from 'react-native';
import { Body, Button, Drawer, Header, Left, Right, Title } from 'native-base';
import SideBar from './sidebar/index';
import ActionButton from 'react-native-action-button';
import styles from './home.style';
import SearchBox from './component/searchBox/searchBox';
import SearchResult from './component/searchResult/searchResult';
import TypeFunction from '../components/typeFunctions/type';
import MapContainer from './component/maps/mapscontainer';
// import ProjectDetail from './projectsdetail/projectdetail';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as g from '../../util';
import reactotronReactNative from 'reactotron-react-native';
import { NavigationActions } from 'react-navigation';
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

// import GPSState from 'react-native-gps-state';
export default class Home extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    onCurrentLocation = () => {
        this.props.onCurrentLocation()
    };
    handleCall = () => requestAnimationFrame(() => {
        if (this.props.project.owner.phoneNumber) {
            Linking.openURL('tel:' + this.props.project.owner.phoneNumber)
        } else return true
    });
    handleMessage = () => requestAnimationFrame(() => {
        if (this.props.project.owner.phoneNumber) {
            Linking.openURL('sms:' + this.props.project.owner.phoneNumber)
        } else return true
    });

    handleSave = () => requestAnimationFrame(() => {
        const { id } = this.props.navigation.state.params;
        this.props.onFollowProject(id);

    });
    handleClose = () => {
        this.props.navigation.goBack();
        requestAnimationFrame(() => this.setState({ modalVisible: false }))
        LayoutAnimation.configureNext(LayoutAnimation.easeInEaseOut);
    };
    onPressImages(listImages, index, isEmptyImages) {
        // this.props.navigation.navigate('FullScreenImage');
        const navigateAction = NavigationActions.navigate({
            routeName: 'FullScreenImage',

            params: {
                listImages: listImages,
                index: index,
                isEmptyImages: isEmptyImages
            },

            // action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
        });

        this.props.navigation.dispatch(navigateAction);
    }
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            type: 'idea',
            region: {
                latitude: 21.004934,
                longitude: 105.7808754,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05 * g.rw
            },
            modalVisible: false,
            dataModal: null,
            typeFunctionVisible: false,
            showSearch: false

        }
    }
    componentWillMount() {
        reactotronReactNative.log("componentWillMount")
        // GPSState.getStatus().then((status) => {
        //     reactotronReactNative.log("componentWillMount", status);
        // });
    }

    componentDidMount() {
        // LocationServicesDialogBox.checkLocationServicesIsEnabled({
        //     message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/>- Use GPS.",
        //     ok: "YES",
        //     cancel: "NO",
        //     enableHighAccuracy: false, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        //     showDialog: true, // false => Opens the Location access page directly
        //     openLocationServices: true, // false => Directly catch method is called if location services are turned off
        //     preventOutSideTouch: true, // true => To prevent the location services window from closing when it is clicked outside
        //     preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
        //     providerListener: true // true ==> Trigger locationProviderStatusChange listener when the location state changes
        // }).then(function(success) {
        //     this.toast.show(success)
        // }).catch((error) => {
        //     DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
        //         this.toast.show("Location "+status) //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        //     });
        // });
        // GPSState.addListener((status) => {
        //     reactotronReactNative.log("xxxx", status);
        // })
        if (this.props.functions.type) {
            this.setState({ type: this.props.functions.type })
        }
        this.props.getListProject(this.props.functions.type);
        if (this.props.project.isLoading) {
            setTimeout(() => this.props.dismiss(), 3000)
        }
    }

    componentWillUnMount() {
        navigator.geolocation.stopObserving();
        LocationServicesDialogBox.stopListener();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.functions.type !== nextProps.functions.type) {
            //  this.props.getListProject(nextProps.functions.type);
            this.setState({ type: nextProps.functions.type })
        }
        if (this.props.locations.region !== nextProps.locations.region) {
            this.setState({ region: nextProps.locations.region })
        }
        // if(this.state.region!==nextState.region){
        //     this.setState({region:nextState.region})
        // }
    }
    goToDetail = (id) => {
        this.props.navigation.navigate('ProjectDetail', { id: id })
    }

    render() {
        console.log("Man hinh Home")
        //  this.props.lang.content;
        // console.log(this.a.onChange()+"");
        const data = this.props.lang.content;
        let title = "";
        Object.keys(data).map(() => {
            if (data.hasOwnProperty(this.props.functions.type)) {
                title = data[this.props.functions.type];
                //do something with value;
            }
        });


        if (this.props.project.isLoading) {

            return (<View style={[styles.no_touch, { backgroundColor: '#ffffff00' }]}>
                <Toast
                    ref={(ref) => this.toast = ref}
                    position='top'
                    positionValue={10} 
                />
                <ActivityIndicator
                    animating={true}
                    color='#ffca00'
                    size="large"
                    style={styles.activityIndicator}
                />
            </View>)
        } else {
            return (
                <Drawer
                    ref={(ref) => {
                        this.drawer = ref;
                    }}
                    content={<SideBar navigation={this.props.navigation} signOut={this.props.logOut}
                        user={this.props.user} navigator={this.navigator} lang={this.props.lang}
                        onChangeLang={this.props.onChangeLang} />}
                    onClose={() => this.closeDrawer()}>
                    <View>
                        <Toast
                            ref={(ref) => this.toast = ref}
                            position='top'
                            positionValue={10} 
                        />
                        <StatusBar hidden={false} backgroundColor={'#ffca00'} barStyle={'dark-content'} />
                        <View style={{ position: 'absolute' }}>
                            {
                                this.state.region && <MapContainer onCurrentLocation={this.onCurrentLocation}
                                    region={this.state.region}
                                    onRegionChange={(region) => this.setState({ region: region })}
                                    data={this.props.project.data}
                                    makerPress={(value) => {
                                        reactotronReactNative.log("value", value);
                                        this.setState({
                                            modalVisible: value.modalVisible
                                        })
                                    }
                                    }
                                    getProjectID={this.goToDetail}
                                />
                            }
                            <SearchBox
                                getAddressPredictions={(text) => {
                                    this.setState({ showSearch: true })
                                    this.props.getAddressPredictions(text);
                                }
                                }
                            />
                            {
                                (this.props.locations.resultList.length !== 0 && this.state.showSearch === true) ?
                                    <SearchResult
                                        predictions={this.props.locations.resultList}
                                        getSelectedAddress={(placeID) => {
                                            this.setState({ showSearch: false })
                                            this.props.getSelectedAddress(placeID)
                                        }}
                                    /> : null
                            }
                            {
                                this.state.typeFunctionVisible &&
                                <TypeFunction
                                    txtIdea={this.props.lang.content.idea}
                                    txtRaiseFunding={this.props.lang.content.raiseFunding}
                                    txtRealEstale={this.props.lang.content.realEstale}
                                    txtSecondHand={this.props.lang.content.secondHand}
                                    getListProject={this.props.getListProject}
                                    onChangeFunction={this.props.onChangeFunction}
                                    currentFunction={this.props.functions.type}
                                    typeFunctionVisible={(res) => this.setState({ typeFunctionVisible: res })}
                                />
                            }
                            <ActionButton
                                style={[styles.btnFabAdd]}
                                buttonColor="#ffca00" onPress={() => requestAnimationFrame(() => {
                                    switch (this.props.functions.type) {
                                        case 'raiseFunding': {
                                            this.props.navigation.navigate('RaiseFunding');
                                            break;
                                        }
                                        case 'idea': {
                                            this.props.navigation.navigate('Idea');
                                            break;
                                        }
                                        case 'realEstale': {
                                            console.log('chưa có realEstale');
                                            this.props.navigation.navigate('RealEstale');
                                            break;
                                        }
                                        case 'docu': {
                                            console.log('chưa có secondHand');
                                            this.props.navigation.navigate('SecondHand');
                                            break;
                                        }
                                        default: {
                                            console.log(this.props.functions.type);
                                            break;
                                        }
                                    }
                                })}>
                            </ActionButton>
                            <TouchableOpacity style={[styles.btnCurrentLocation]}
                                onPress={() => requestAnimationFrame(this.onCurrentLocation)}>
                                <Image source={require('../../assets/icons/location.png')} resizeMethod={'auto'}
                                    style={styles.imgLocation} />
                            </TouchableOpacity>
                        </View>
                        <Header style={{ backgroundColor: '#ffca00', height: 72 * g.rh }}
                            androidStatusBarColor="#ffca00">
                            <Left>
                                <Button transparent onPress={() => requestAnimationFrame(() => {
                                    this.openDrawer()
                                })}>
                                    <Image style={{ width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain' }}
                                        source={require('../../assets/icons/icon_menu.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => this.setState({ typeFunctionVisible: !this.state.typeFunctionVisible })}>
                                    <Title style={[{
                                        fontSize: 18,
                                        fontFamily: 'Roboto-BoldCondensed',
                                        color: '#383838',
                                        alignSelf: 'center'
                                    }]}
                                    >{(title + "").toUpperCase()}</Title>
                                    <Image style={{ resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center', marginLeft: 5 }} source={this.state.typeFunctionVisible ? require('../../assets/icons/arrow_dropdown.png') : require('../../assets/icons/arrow_dropup.png')} />
                                </TouchableOpacity>

                            </Body>
                            <Right>
                            </Right>
                        </Header>
                    </View>
                </Drawer>
            );
        }
    }
}