import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity, View, ScrollView, Image, Picker } from 'react-native';
import { Button, Content, Form, Input, Item, Icon } from 'native-base';
import Loading from "../components/loading";
import Toobar from '../components/toolbar';
import * as g from '../../util/index';
import validate from 'validate.js';
import DatePicker from "../components/datepicker";
import moment from "moment";
import ImagePicker from 'react-native-image-crop-picker';
import MODAL_TYPE from './component/modalType';
// import Toast from 'react-native-toast-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import reactotronReactNative from 'reactotron-react-native';
const MB = 2;
const oneMB = 1048576;
const TYPES = [{
    key: 'bds_sell',
}, {
    key: 'bds_buy'
}, {
    key: 'bds_thue'
}, {
    key: 'bds_doi'
}
];

const DIREACTIONS = [
    { key: 'north' },
    {
        key: 'south'
    },
    {
        key: 'east'

    }, {
        key: 'west'
    },
    {
        key: 'northeast'
    }, {
        key: 'southeast'
    }, {
        key: 'northwest'
    }, {
        key: 'southwest'
    }];
export default class RealEstale extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            type: "bds_sell",
            modalType: false,
            modalDirection: false,
            direaction: "south",
            name: "",
            endDate: moment().add(1, 'year').format("YYYY-MM-DD"),
            startDate: moment().format("YYYY-MM-DD") + "",
            detail: "",
            note: "",
            price: "",
            location: [],
            date: new Date(),
            area: 0,
            address: "",
            image: [],
            typeIOS: "",
            direactionIOS: 0,
            loadingButton: false

        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 3000);
    }
    handleImage() {
        if (Platform.OS === 'android') {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: "photo",
                maxFiles: 5,
                minFiles: 1,
                includeBase64: true
            }).then(images => {
                reactotronReactNative.log("images", images[0].size / oneMB);
                if (images[0].size / oneMB > MB) {
                    this.showToast(this.props.lang.type === 'vi' ? "Chất lượng ảnh < 2MB" : "Size image < 2MB");
                    return;
                }
                let imageData = [];
                imageData.push(images[0].data)
                this.setState({ image: this.state.image.concat(imageData) })
            });
        } else {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: "photo",
                maxFiles: 5,
                minFiles: 1,
                includeBase64: true
            }).then(images => {
                let imageData = [];
                for (var i = 0; i < images.length; i++) {
                    imageData.push(images[i].data)
                }
                Promise.all(imageData).then(() => {
                    this.setState({ image: this.state.image.concat(imageData) })
                })
            });
        }

    }
    componentWillUnMount() {
        navigator.geolocation.stopObserving();
    }
    removeImage(index) {
        let array = this.state.image;
        array.splice(index, 1);
        this.setState({ image: array })
    }
    componentWillMount() {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    try {
                        let lnglat = {
                            1: position.coords.longitude,
                            2: position.coords.latitude,

                        };
                        this.setState({ location: Object.values(lnglat) })
                    } catch (er) {
                        console.log(er)
                    }
                },
                (error) => {
                    this.showToast(this.props.lang.content.checkLocation + " ")
                }
            );
        } catch (error) {
            console.log(error)
        }

    }
    nameType(text, lang = 'en') {
        switch (text) {
            case 'bds_sell':
                return lang === 'vi' ? 'Cần bán' : 'SELL';
            case 'bds_buy':
                return lang === 'vi' ? 'Cần mua' : 'BUY';
            case 'bds_thue':
                return lang === 'vi' ? 'Cần thuê' : 'RENT';
            case 'bds_doi':
                return lang === 'vi' ? 'Cần đổi' : 'exchange';
            case 'north':
                return lang === 'vi' ? 'Hướng bắc' : 'North';
            case 'south':
                return lang === 'vi' ? 'Hướng nam' : 'south';
            case 'east':
                return lang === 'vi' ? 'Hướng đông' : 'east';
            case 'west':
                return lang === 'vi' ? 'Hướng tây' : 'west';
            case 'northeast':
                return lang === 'vi' ? 'Hướng đông bắc' : 'northeast';
            case 'southeast':
                return lang === 'vi' ? 'Hướng đông nam' : 'southeast';
            case 'northwest':
                return lang === 'vi' ? 'Hướng tây bắc' : 'northwest';
            case 'southwest':
                return lang === 'vi' ? 'Hướng tây nam' : 'southwest';
            default:
                return 'chưa chọn'

        }
    }
    showToast(message) {
        if(this.toast){
            this.toast.show(message);
        }
    }
    addData() {
        const { name, detail, type, startDate, endDate, location, direaction, address, area, price, image } = this.state;
        let start = moment(this.state.startDate).unix();
        let end = moment(this.state.endDate).unix();
        if (start < end) {
            if (name && detail && type && address && area && price) {
                //them moi bat dong san
                let data = {
                    name: name,
                    detail: detail,
                    type: type,
                    startDate: startDate,
                    endDate: endDate,
                    location: location,
                    direaction: direaction,
                    address: address,
                    area: parseFloat(area),
                    price: parseFloat(price),
                    image: image
                }
                reactotronReactNative.log("data", data);
                this.props.onAdd(data, (message) => {
                    this.showToast(message);
                    setTimeout(() => {
                        this.props.navigation.goBack();
                    }, 2000)
                });
            } else {
                if (!name) {
                    this.showToast(this.props.lang.type === 'vi' ? "Tên không được để trống" : "Name is not emty")
                    this.CustomButton.turnOffLoading();
                } else if (!detail) {
                    this.showToast(this.props.lang.type === 'vi' ? "Nội dung không được để trống" : "Content is not emty");
                    this.CustomButton.turnOffLoading();
                } else if (!address) {
                    this.showToast(this.props.lang.type === 'vi' ? "Địa chỉ không được để trống" : "Address is not emty")
                    this.CustomButton.turnOffLoading();
                } else if (!price) {
                    this.showToast(this.props.lang.type === 'vi' ? "Giá không được để trống" : "Price is not emty");
                    this.CustomButton.turnOffLoading();
                } else if (!area) {
                    this.showToast(this.props.lang.type === 'vi' ? "Diện tích không được để trống" : "Area is not emty")
                    this.CustomButton.turnOffLoading();
                } else {
                    this.showToast(this.props.lang.type === 'vi' ? "Không thành công. Thử lại" : "Unsuccessfuly. Try again")
                    this.CustomButton.turnOffLoading();
                }
            }
        } else {
            this.showToast(this.props.lang.type === 'vi' ? "Thời gian đến phải lớn hơn thời gian bắt đầu" : "End time must be greater than start time");
            this.CustomButton.turnOffLoading();
        }
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lnglat = {
                        1: position.coords.longitude,
                        2: position.coords.latitude,

                    };
                    this.setState({ location: Object.values(lnglat) })
                },
                (error) => {

                    this.showToast(this.props.lang.content.checkLocation + " ")
                }
            );
        } catch (error) {
            console.log(error)
        }

    }
    render() {
        if (this.state.loading) return (<Loading />);
        else return (
            <View style={{ flex: 1 }}>
                <Toobar leftPress={() => this.props.navigation.goBack()}
                    imageLeft={require('../../assets/icons/login_back.png')}
                    title={(this.props.lang.type === "vi" ? "Thêm bất động sản" : "Add " + this.props.lang.content.realEstale + "").toUpperCase()} />
                <Content style={{ flex: 1 }}>
                    {/* <View style={{ backgroundColor: '#cfcfcf', height: 35 * g.rh }} /> */}

                    <Form style={{ flex: 1, marginTop: 25 * g.rh, padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold'
                                }}>{this.props.lang.content.nameProject}</Text>
                            </View>
                            <Item regular
                                style={{ backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw) }}
                                error={validate.isEmpty(this.state.name)}>
                                <Input
                                    placeholder={(this.props.lang.content.typeInp + ' ' + this.props.lang.content.nameProject).toLowerCase()}
                                    returnKeyType={'next'} style={{ fontSize: 18, fontFamily: 'Roboto-Condensed' }}
                                    onChangeText={(text) => {
                                        this.setState({ name: text })
                                    }} />
                            </Item>
                        </View>
                        {
                            <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                                <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                    <Text style={{
                                        fontFamily: 'Roboto-BoldCondensed',
                                        color: '#595959',
                                        fontWeight: 'bold'
                                    }}>{this.props.lang.type == "vi" ? "Loại" : 'Type'}</Text>
                                </View>
                                {
                                    Platform.OS === 'ios' ? (
                                        <TouchableOpacity style={{
                                            flex: 1,
                                            borderRadius: 6 * (g.rh + g.rw),
                                            backgroundColor: '#cfcfcf',
                                            height: 50 * g.rh,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: this.state.type !== 0 ? 'transparent' : '#ff0000',
                                            borderWidth: this.state.type !== 0 ? 0 : 1
                                        }}
                                            onPress={() => requestAnimationFrame(() => this.setState({ modalType: true }))}>
                                            <Text style={{
                                                fontFamily: 'Roboto-Condensed',
                                                fontSize: 15 * g.rw
                                            }}>{this.nameType(this.state.type, this.props.lang.type) ? this.nameType(this.state.type, this.props.lang.type) : (this.props.lang.type === "vi" ? 'Vui lòng chọn' : 'Select one')}</Text>
                                        </TouchableOpacity>
                                    ) : (<Picker selectedValue={this.state.type} style={{
                                        flex: 1,
                                        borderRadius: 6 * (g.rh + g.rw),
                                        borderColor: this.state.type !== 0 ? '#cfcfcf' : '#ff0000',
                                        borderWidth: this.state.type !== 0 ? 0 : 1
                                    }} itemStyle={{
                                        borderColor: '#cfcfcf',
                                        backgroundColor: '#cfcfcf',
                                        justifyContent: 'center',
                                        height: 50 * g.rh,
                                        borderRadius: 6 * (g.rh + g.rw),
                                        fontFamily: 'Roboto-Condensed',
                                        fontSize: 15 * g.rw
                                    }} onValueChange={(value) => this.setState({ type: value })}>
                                        <Picker.Item value={0}
                                            label={this.props.lang.type === "vi" ? 'Vui lòng chọn' : 'Select one'} />
                                        {
                                            TYPES.map((value, index) => {
                                                return (<Picker.Item key={index} value={value.key}
                                                    label={(this.nameType(value.key, this.props.lang.type) + "").toUpperCase()} />)
                                            })
                                        }
                                    </Picker>)
                                }

                            </View>}
                        {<View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold'
                                }}>{this.props.lang.type === "vi" ? "Hướng" : 'Direction'}</Text>
                            </View>
                            {
                                Platform.OS === 'ios' ? (
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        borderRadius: 6 * (g.rh + g.rw),
                                        backgroundColor: '#cfcfcf',
                                        height: 50 * g.rh,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: this.state.type !== 0 ? 'transparent' : '#ff0000',
                                        borderWidth: this.state.type !== 0 ? 0 : 1
                                    }}
                                        onPress={() => requestAnimationFrame(() => this.setState({ modalDirection: true }))}>
                                        <Text style={{
                                            fontFamily: 'Roboto-Condensed',
                                            fontSize: 15 * g.rw
                                        }}>{this.nameType(this.state.direaction, this.props.lang.type) ? this.nameType(this.state.direaction, this.props.lang.type) : (this.props.lang.type === "vi" ? 'Vui lòng chọn' : 'Select one').toUpperCase()}</Text>
                                    </TouchableOpacity>
                                ) : (<Picker selectedValue={this.state.direaction} style={{
                                    flex: 1,
                                    borderRadius: 6 * (g.rh + g.rw),
                                    borderColor: this.state.direaction !== 0 ? '#cfcfcf' : '#ff0000',
                                    borderWidth: this.state.direaction !== 0 ? 0 : 1
                                }} itemStyle={{
                                    borderColor: '#cfcfcf',
                                    backgroundColor: '#cfcfcf',
                                    justifyContent: 'center',
                                    height: 50 * g.rh,
                                    borderRadius: 6 * (g.rh + g.rw),
                                    fontFamily: 'Roboto-Condensed',
                                    fontSize: 15 * g.rw
                                }} onValueChange={(value) => this.setState({ direaction: value })}>
                                    <Picker.Item value={0}
                                        label={this.props.lang.type === "vi" ? 'Vui lòng chọn' : 'Select one'} />
                                    {
                                        DIREACTIONS.map((value, index) => {
                                            return (<Picker.Item key={index} value={value.key}
                                                label={(this.nameType(value.key, this.props.lang.type) + "").toUpperCase()} />)
                                        })
                                    }
                                </Picker>)
                            }

                        </View>}
                        <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.content.timeStart + ""}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Item regular style={{
                                    backgroundColor: '#cfcfcf',
                                    flex: 3 / 4,
                                    borderRadius: 6 * (g.rh + g.rw),
                                    marginRight: 4 * g.rw
                                }}>
                                    <Input placeholder={(this.props.lang.content.startDate + "").toLowerCase()}
                                        disabled={true} value={this.state.startDate ? this.state.startDate : ''}
                                        onChangeText={(text) => this.setState({ startDate: text })}
                                        style={{ fontSize: 18, fontFamily: 'Roboto-Condensed', }} />
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
                                        this.setState({ startDate: date });
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{(this.props.lang.content.timeEnd + "")}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Item regular style={{
                                    backgroundColor: '#cfcfcf',
                                    flex: 3 / 4,
                                    borderRadius: 6 * (g.rh + g.rw),
                                    marginRight: 4 * g.rw
                                }}>
                                    <Input placeholder={(this.props.lang.content.endDate + "").toLowerCase()}
                                        disabled={true} value={this.state.endDate ? this.state.endDate : ''}
                                        style={{ fontSize: 18, fontFamily: 'Roboto-Condensed', }}
                                        onChangeText={(text) => this.setState({ endDate: text })} />
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
                                        this.setState({ endDate: date });
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.type == "vi" ? "Địa chỉ" : "Address"}</Text>
                            </View>
                            <Item regular
                                style={{ backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw) }}
                            >
                                <Input
                                    placeholder={(this.props.lang.type == "vi" ? "nhập địa chỉ" : "type address").toLowerCase()}
                                    returnKeyType={'next'} multiline={false}
                                    style={{ fontSize: 18, fontFamily: 'Roboto-Condensed' }}
                                    onChangeText={(text) => this.setState({ address: text })} />
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.type == "vi" ? "Diện tích" : 'Area' + "(m²)"}</Text>
                            </View>
                            <Item regular
                                style={{ backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw) }}
                                error={!validate.isNumber(parseFloat(this.state.area))}>
                                <Input
                                    placeholder={(this.props.lang.type == "vi" ? "nhập diện tích" : "type area").toLowerCase()}
                                    returnKeyType={'next'} value={this.state.area ? this.state.area + "" : null} keyboardType={'numeric'} multiline={false}
                                    style={{ fontSize: 18, fontFamily: 'Roboto-Condensed' }}
                                    onChangeText={(text) => this.setState({ area: parseFloat(text) })} />
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.type === "vi" ? "Giá" : "Price"}</Text>
                            </View>
                            <Item regular
                                style={{ backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw) }}
                                error={!validate.isNumber(parseFloat(this.state.price))}>
                                <Input
                                    placeholder={(this.props.lang.type === "vi" ? "Nhập giá" : "type price").toLowerCase()}
                                    returnKeyType={'next'} keyboardType={'numeric'} multiline={false}
                                    style={{ fontSize: 18, fontFamily: 'Roboto-Condensed' }}
                                    onChangeText={(text) => this.setState({ price: (text) })} />
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                            <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-BoldCondensed',
                                    color: '#595959',
                                    fontWeight: 'bold',
                                    fontSize: 15 * g.rw
                                }}>{this.props.lang.content.content + ""}</Text>
                            </View>
                            <Item regular
                                style={{ backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw) }}
                                error={validate.isEmpty(this.state.detail)}>
                                <Input placeholder={(this.props.lang.content.content + "").toLowerCase()}
                                    enablesReturnKeyAutomatically={true} returnKeyType={'done'} multiline={true}
                                    style={{ fontSize: 18, fontFamily: 'Roboto-Condensed', minHeight: 100 * g.rh }}
                                    onChangeText={(text) => this.setState({ detail: text })} />
                            </Item>
                        </View>
                        <ScrollView style={{ marginTop: 10 * g.rh }} horizontal={true}>
                            <View style={{ flexDirection: "row-reverse", alignItems: 'center' }}>
                                {
                                    this.state.image.length > 0 && this.state.image.map((value, index) => {
                                        return (
                                            <View style={{ width: 50 * g.rh, height: 50 * g.rh }} key={index}>
                                                <Image

                                                    source={{ uri: "data:image/png;base64," + value }}
                                                    style={{ resizeMode: 'contain', width: 30 * g.rh, height: 30 * g.rh, margin: 10 }}
                                                />
                                                <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0 }} onPress={() => this.removeImage(index)}>
                                                    <Icon name="ios-close-circle-outline" style={{ color: "red", fontSize: 20 }} />
                                                </TouchableOpacity>
                                            </View>

                                        )
                                    })
                                }
                                {
                                    this.state.image.length < 5 &&
                                    <TouchableOpacity
                                        style={{ width: 50 * g.rh, height: 50 * g.rh, borderRadius: 4, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => this.handleImage()}
                                    >
                                        <Text style={{ fontSize: 40, color: '#000', backgroundColor: 'transparent' }}>{"+"}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </ScrollView>
                        <CustomButton
                            lang={this.props.lang}
                            addData={() => this.addData()}
                            ref={(ref) => this.CustomButton = ref}
                        />
                    </Form>
                </Content>
                {
                    this.state.modalType && <MODAL_TYPE modalType={this.state.modalType} onRequestClose={() => this.setState({ modalType: false })} submit={(text) => { this.setState({ type: text, modalType: false }) }} cancel={() => this.setState({ modalType: false })} nameType={this.nameType.bind(this)} onValueChange={(text) => this.setState({ typeIOS: text })} typeIOS={this.state.typeIOS} lang={this.props.lang} type={this.state.type}
                        TYPES={TYPES} />
                }{
                    this.state.modalDirection && <MODAL_TYPE modalType={this.state.modalDirection} onRequestClose={() => this.setState({ modalDirection: false })} submit={(text) => { this.setState({ direaction: text, modalDirection: false }) }} cancel={() => this.setState({ modalDirection: false })} nameType={this.nameType.bind(this)} onValueChange={(text) => this.setState({ direactionIOS: text })} typeIOS={this.state.direactionIOS} lang={this.props.lang} type={this.state.direaction}
                        TYPES={DIREACTIONS} />
                }
                <Toast
                    ref={(ref) => this.toast = ref}
                    position='top'
                    positionValue={10} 
                />

            </View>
        )
    }
}
class CustomButton extends Component {
    state = { loading: false }
    addData() {
        this.setState({ loading: true });
        this.props.addData();
    }
    turnOffLoading() {
        this.setState({ loading: false })
    }

    render() {
        let lang = this.props.lang;
        return (
            <TouchableOpacity style={{ marginTop: 15 * g.rh }} onPress={() => this.addData()}>

                <View style={{
                    height: 65 * g.rh,
                    backgroundColor: '#ffca00',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6 * (g.rh + g.rw)
                }}>
                    {
                        (this.state.loading) ?
                            <Loading color={"white"} /> :
                            <Text style={{
                                color: '#303030',
                                fontSize: 16,
                                fontWeight: 'bold',
                                fontFamily: 'Roboto-BoldCondensed'
                            }}>{(
                                (lang.type == "vi" ? "thêm " : "add ") + lang.content.realEstale).toUpperCase()}
                            </Text>
                    }

                </View>
            </TouchableOpacity>
        )

    }
}
