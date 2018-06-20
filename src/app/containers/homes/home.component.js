import React from 'react';
import {ActivityIndicator, Image, Linking, StatusBar, TouchableOpacity, View,LayoutAnimation} from 'react-native';
import {Body, Button, Content, Drawer, Fab, Header, Icon, Left, Right, Segment, Title} from 'native-base';
import SideBar from './sidebar/index';
import ActionButton from 'react-native-action-button';
import styles from './home.style';
import SearchBox from './component/searchBox/searchBox';
import SearchResult from './component/searchResult/searchResult';
import TypeFunction from '../components/typeFunctions/type';
import MapContainer from './component/maps/mapscontainer';
import ProjectDetail from './projectsdetail/projectdetail';
import * as g from '../../util';

export default class Home extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };
    // }
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
        const {id} = this.props.navigation.state.params;
        this.props.onFollowProject(id);

    });
    handleClose = () => {
        this.props.navigation.goBack();
        requestAnimationFrame(() =>this.setState({modalVisible:false}))
        LayoutAnimation.configureNext(LayoutAnimation.easeInEaseOut);
    };
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
            typeFunctionVisible: false

        }
    }

    componentDidMount() {
        if (this.props.functions.type) {
            this.setState({type: this.props.functions.type})
        }
        this.props.getListProject(this.props.functions.type);
        if (this.props.project.isLoading) {
            setTimeout(() => this.props.dismiss(), 3000)
        }
    }

    componentWillUnMount() {
        navigator.geolocation.stopObserving();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.functions.type !== nextProps.functions.type) {
            //  this.props.getListProject(nextProps.functions.type);
            this.setState({type: nextProps.functions.type})
        }
        if (this.props.locations.region !== nextProps.locations.region) {
            this.setState({region: nextProps.locations.region})
        }
        // if(this.state.region!==nextState.region){
        //     this.setState({region:nextState.region})
        // }
    }

    render() {
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

            return (<View style={[styles.no_touch, {backgroundColor: '#ffffff00'}]}>
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
                                      onChangeLang={this.props.onChangeLang}/>}
                    onClose={() => this.closeDrawer()}>
                    <View>
                        <StatusBar hidden={false} backgroundColor={'#ffca00'} barStyle={'dark-content'}/>
                        <View style={{position: 'absolute'}}>
                            {
                                this.state.region && <MapContainer onCurrentLocation={this.onCurrentLocation}
                                                                   region={this.state.region}
                                                                   onRegionChange={(region) => this.setState({region: region})}
                                                                   data={this.props.project.data}
                                                                   makerPress={(value) => this.setState({
                                                                       modalVisible: value.modalVisible
                                                                   })}
                                                                   getProjectID={this.props.getProjectID}
                                />
                            }
                            <SearchBox getAddressPredictions={this.props.getAddressPredictions}/>
                            {this.props.locations.resultList.length !== 0 &&
                            <SearchResult predictions={this.props.locations.resultList}
                                          getSelectedAddress={this.props.getSelectedAddress}/>}
                            {this.state.typeFunctionVisible && <TypeFunction txtIdea={this.props.lang.content.idea}
                                                                             txtRaiseFunding={this.props.lang.content.raiseFunding}
                                                                             txtRealEstale={this.props.lang.content.realEstale}
                                                                             txtSecondHand={this.props.lang.content.secondHand}
                                                                             getListProject={this.props.getListProject}
                                                                             onChangeFunction={this.props.onChangeFunction}
                                                                             currentFunction={this.props.functions.type}
                                                                             typeFunctionVisible={(res) => this.setState({typeFunctionVisible: res})}
                            />}
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
                                       style={styles.imgLocation}/>
                            </TouchableOpacity>
                            {
                                this.state.modalVisible &&
                                <ProjectDetail modalVisible={this.state.modalVisible}
                                               onRequestClose={(modal) => this.setState({modalVisible: modal})}
                                               lang={this.props.lang} dataModal={this.props.project.project}
                                               handleClose={this.handleClose}
                                               handleSave={this.handleSave}
                                               handleCall={this.handleCall}
                                               handleMessage={this.handleMessage}/>
                            }
                        </View>
                        <Header style={{backgroundColor: '#ffca00', height: 72 * g.rh}}
                                androidStatusBarColor="#ffca00">
                            <Left>
                                <Button transparent onPress={() => requestAnimationFrame(() => {
                                    this.openDrawer()
                                })}>
                                    <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain'}}
                                           source={require('../../assets/icons/icon_menu.png')}/>
                                </Button>
                            </Left>
                            <Body>
                            <TouchableOpacity style={{flexDirection:'row',flex:1}}  onPress={() => this.setState({typeFunctionVisible: !this.state.typeFunctionVisible})}>
                            <Title style={[{
                                fontSize: 18,
                                fontFamily: 'Roboto-BoldCondensed',
                                color: '#383838',
                                alignSelf: 'center'
                            }]}
                                   >{(title + "").toUpperCase()}</Title>
                                   <Image style={{resizeMode:'contain',width:15,height:15,alignSelf:'center',marginLeft:5}} source={this.state.typeFunctionVisible?require('../../assets/icons/arrow_dropdown.png'):require('../../assets/icons/arrow_dropup.png')}/>
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