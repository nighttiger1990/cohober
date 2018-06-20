import React from 'react';
import {Platform, Text, TouchableOpacity, View,ScrollView,Image,Picker} from 'react-native';
import {Button, Content, Form, Header, Icon, Input, Item, Left, Right, Title} from 'native-base';
import Loading from "../components/loading";
import Toobar from '../components/toolbar';
import * as g from '../../util/index';
import validate from 'validate.js';
import DatePicker from "../components/datepicker";
import moment from "moment";
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-native';
export default class SecondHand extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            image:[],
            location:[],
            type: "docu",
            name:"",
            endDate: moment().add(1, 'year').format("YYYY-MM-DD"),
            startDate: moment().format("YYYY-MM-DD") + "",
            detail: "",
            note: "",
            date: new Date(),
            address:"",
            price:0
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 3000);
    }
    handleImage(){
        if(Platform.OS==='android'){
            ImagePicker.openPicker({
                multiple: true,
                mediaType: "photo",
                maxFiles:5,
                minFiles:1,
                includeBase64:true
              }).then(images => {
                   let imageData=[];
                   imageData.push(images[0].data)
                 this.setState({image:this.state.image.concat(imageData)})
                //console.log(this.state.image);
              });
        }else{
            ImagePicker.openPicker({
                multiple: true,
                mediaType: "photo",
                maxFiles:5,
                minFiles:1,
                includeBase64:true
              }).then(images => {
                   let imageData=[];
                   for(var i=0;i< images.length;i++){
                    imageData.push(images[i].data)
                   }
                   Promise.all(imageData).then(()=>{
                    this.setState({image:this.state.image.concat(imageData)})
                   })
                 
                
              });
        }
       
    }
    componentWillUnMount() {
        navigator.geolocation.stopObserving();
    }
    
    componentWillMount() {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    try {
                        console.log(JSON.stringify(position));
                        let lnglat = {
                            1: position.coords.longitude,
                            2: position.coords.latitude,
    
                        };
                        this.setState({location: Object.values(lnglat)})
                    } catch (er) {
                        console.log(er)
                    }
    
    
                },
                (error) => Toast.show(this.props.lang.content.checkLocation + " ", Toast.SHORT, Toast.TOP, {
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
    onAdd(){
        let {name,address,image,price,detail,type,startDate,endDate} =this.state;
        let data= {
            name:name,
            address:address,
            image:image,
            price:price,
            detail:detail,
            type:type,
            startDate:startDate,
            endDate:endDate
        };
        this.props.onAdd(data);
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const initialPosition = JSON.stringify(position);
                    console.log(initialPosition);
                    let lnglat = {
                        1: position.coords.longitude,
                        2: position.coords.latitude,
    
                    };
                    this.setState({location: Object.values(lnglat)})
                },
                (error) => Toast.show(this.props.lang.content.checkLocation + " ", Toast.SHORT, Toast.TOP, {
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
    render() {
        console.log(''+this.props.lang)
        if (this.state.loading) return (<Loading/>);
        else return (<View style={{flex:1}}>
            <Toobar leftPress={() => this.props.navigation.goBack()}
                    imageLeft={require('../../assets/icons/login_back.png')}
                    title={(this.props.lang.type==="vi"?"Thêm Đồ Cũ ":"Add Second hand "+this.props.lang.content.secondHand + "").toUpperCase()}/>
             <Content>
                <Content style={{flex:1}}>
                    <View style={{backgroundColor: '#cfcfcf', height: 35 * g.rh}}/>

                    <Form style={{flex: 1, marginTop: 25 * g.rh, padding: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{alignSelf: 'center', flex: 1 / 3}}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold'
                                }}>{this.props.lang.type==="vi"?"Tên sản phẩm":"Name product"}</Text>
                            </View>
                            <Item regular
                                  style={{backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw)}}
                                  error={validate.isEmpty(this.state.name)}>
                                <Input
                                    placeholder={(this.props.lang.content.typeInp + ' ' + this.props.lang.type==='vi'?"Tên sản phẩm":"Name product").toLowerCase()}
                                    returnKeyType={'next'} style={{fontSize: 18, fontFamily: 'Roboto-Condensed'}}
                                    onChangeText={(text) => {
                                        this.setState({name: text})
                                    }}/>
                            </Item>
                        </View>
                       
                      
                        <View style={{flexDirection: 'row', marginTop: 10 * g.rh}}>
                            <View style={{alignSelf: 'center', flex: 1 / 3}}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.content.timeStart + ""}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Item regular style={{
                                    backgroundColor: '#cfcfcf',
                                    flex: 3 / 4,
                                    borderRadius: 6 * (g.rh + g.rw),
                                    marginRight: 4 * g.rw
                                }}>
                                    <Input placeholder={(this.props.lang.content.startDate + "").toLowerCase()}
                                           disabled={true} value={this.state.startDate ? this.state.startDate : ''}
                                           onChangeText={(text) => this.setState({startDate: text})}
                                           style={{fontSize: 18, fontFamily: 'Roboto-Condensed',}}/>
                                </Item>
                                <DatePicker
                                    style={{
                                        marginLeft: 4 * g.rw,
                                        flex: 1 / 4,
                                        backgroundColor: '#cfcfcf',
                                        borderRadius: 6 * (g.rh + g.rw),
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    date={this.state.startDate}
                                    mode="date"
                                    androidMode="calendar"
                                    format={"YYYY-MM-DD"}
                                    minDate={moment().format('YYYY-MM-DD')}
                                    maxDate={"2100-12-31"}
                                    confirmBtnText={this.props.lang.content.confirm + " "}
                                    cancelBtnText={this.props.lang.content.cancel + " "}
                                    showIcon={true}
                                    hideText={true}
                                    iconSource={require('../../assets/icons/icon_calendar.png')}
                                    customStyles={{
                                        dateIcon: {
                                            width: 40 * g.rw,
                                            height: 40 * g.rh,
                                            resizeMode: 'contain',
                                            alignSelf: 'center'
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({startDate: date});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10 * g.rh}}>
                            <View style={{alignSelf: 'center', flex: 1 / 3}}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{(this.props.lang.content.timeEnd + "")}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Item regular style={{
                                    backgroundColor: '#cfcfcf',
                                    flex: 3 / 4,
                                    borderRadius: 6 * (g.rh + g.rw),
                                    marginRight: 4 * g.rw
                                }}>
                                    <Input placeholder={(this.props.lang.content.endDate + "").toLowerCase()}
                                           disabled={true} value={this.state.endDate ? this.state.endDate : ''}
                                           style={{fontSize: 18, fontFamily: 'Roboto-Condensed',}}
                                           onChangeText={(text) => this.setState({endDate: text})}/>
                                </Item>

                                <DatePicker
                                    style={{
                                        marginLeft: 4 * g.rw,
                                        flex: 1 / 4,
                                        backgroundColor: '#cfcfcf',
                                        borderRadius: 6 * (g.rh + g.rw),
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    date={this.state.endDate}
                                    mode="date"
                                    androidMode="calendar"
                                    format="YYYY-MM-DD"
                                    minDate={moment().format('YYYY-MM-DD')}
                                    maxDate="2100-12-31"
                                    confirmBtnText={this.props.lang.content.confirm + " "}
                                    cancelBtnText={this.props.lang.content.cancel + " "}
                                    showIcon={true}
                                    hideText={true}
                                    iconSource={require('../../assets/icons/icon_calendar.png')}
                                    customStyles={{
                                        dateIcon: {
                                            width: 40 * g.rw,
                                            height: 40 * g.rh,
                                            resizeMode: 'contain',
                                            alignSelf: 'center'
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({endDate: date});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10 * g.rh}}>
                            <View style={{alignSelf: 'center', flex: 1 / 3}}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.type=="vi"?"Địa chỉ":"Address"}</Text>
                            </View>
                            <Item regular
                                  style={{backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw)}}
                                 >
                                <Input
                                    placeholder={(this.props.lang.type=="vi"?"nhập địa chỉ":"type address").toLowerCase()}
                                    returnKeyType={'next'}  multiline={false}
                                    style={{fontSize: 18, fontFamily: 'Roboto-Condensed'}}
                                    onChangeText={(text) => this.setState({address: text})}/>
                            </Item>
                        </View>
                       
                        <View style={{flexDirection: 'row', marginTop: 10 * g.rh}}>
                            <View style={{alignSelf: 'center', flex: 1 / 3}}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.type==="vi"?"Giá":"Price"}</Text>
                            </View>
                            <Item regular
                                  style={{backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw)}}
                                  error={!validate.isNumber(parseFloat(this.state.price))}>
                                <Input
                                    placeholder={(this.props.lang.type==="vi"?"Nhập giá": "type price").toLowerCase()}
                                    returnKeyType={'next'} keyboardType={'numeric'} multiline={false}
                                    style={{fontSize: 18, fontFamily: 'Roboto-Condensed'}}
                                    onChangeText={(text) => this.setState({price: (text)})}/>
                            </Item>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10 * g.rh}}>
                            <View style={{alignSelf: 'center', flex: 1 / 3}}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.type==="vi"?"Mô tả":"Description" + ""}</Text>
                            </View>
                            <Item regular
                                  style={{backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw)}}
                                  error={validate.isEmpty(this.state.detail)}>
                                <Input placeholder={(this.props.lang.type==='vi'?"Nhập mô tả":"type description" + "").toLowerCase()}
                                       enablesReturnKeyAutomatically={true} returnKeyType={'done'} multiline={true}
                                       style={{fontSize: 18, fontFamily: 'Roboto-Condensed', minHeight: 100 * g.rh}}
                                       onChangeText={(text) => this.setState({detail: text})}/>
                            </Item>
                        </View>
                        <ScrollView style={{marginTop:10*g.rh}} horizontal={true}>
                        <View style={{flexDirection:"row-reverse",alignItems:'center'}}>
                            {
                                this.state.image.length>0&&this.state.image.map((value,index)=>{  return(<Image key={index} source={{uri:"data:image/png;base64,"+value}} style={{resizeMode:'contain',width:30*g.rh,height:30*g.rh,margin:10}}/>)})
                            }{
                                this.state.image.length<5&&<TouchableOpacity style={{width:50*g.rh,height:50*g.rh,borderRadius:4,backgroundColor:'#ccc',alignItems:'center',justifyContent:'center'}} onPress={()=>this.handleImage()}>
                                    <Text style={{fontSize:40,color:'#000',backgroundColor:'transparent'}}>{"+"}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        </ScrollView>
                        <TouchableOpacity style={{marginTop: 15 * g.rh}} onPress={() => this.onAdd()}>
                            <View style={{
                                height: 65 * g.rh,
                                backgroundColor: '#ffca00',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 6 * (g.rh + g.rw)
                            }}>
                                <Text style={{
                                    color: '#303030',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto-BoldCondensed'
                                }}>{(
                                    (this.props.lang.type=="vi"?"thêm ":"add ")+this.props.lang.content.secondHand).toUpperCase()}</Text>
                            </View>
                        </TouchableOpacity>
                    </Form>
                </Content>
            </Content>
        </View>)
    }
}