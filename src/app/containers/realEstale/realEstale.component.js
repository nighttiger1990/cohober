import React from 'react';
import { Platform, Text, TouchableOpacity, View, ScrollView, Image, Picker } from 'react-native';
import { Button, Content, Form, Header, Icon, Input, Item, Left, Right, Title } from 'native-base';
import Loading from "../components/loading";
import Toobar from '../components/toolbar';
import * as g from '../../util/index';
import validate from 'validate.js';
import DatePicker from "../components/datepicker";
import moment from "moment";
import ImagePicker from 'react-native-image-crop-picker';
import MODAL_TYPE from './component/modalType';
import Toast from 'react-native-toast-native';
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
            direactionIOS: 0

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
                let imageData = [];
                imageData.push(images[0].data)
                this.setState({ image: this.state.image.concat(imageData) })
                //console.log(this.state.image);
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
                        this.setState({ location: Object.values(lnglat) })
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
    addData() {
        const { name, detail, type, startDate, endDate, location, direction, address, area, price, image } = this.state;
        console.log("xxx",this.state)
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
                    direaction: direction,
                    address: address,
                    area: parseFloat(area),
                    price: parseFloat(price),
                    image: image
                }
                this.props.onAdd(data)
            } else {
                if (!name) {
                    Toast.show(this.props.lang.type === 'vi' ? "Tên không được để trống" : "Name is not emty", Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                } else if (!detail) {
                    Toast.show(this.props.lang.type === 'vi' ? "Nội dung không được để trống" : "Content is not emty", Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                } else if (!address) {
                    Toast.show(this.props.lang.type === 'vi' ? "Địa chỉ không được để trống" : "Address is not emty", Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                } else if (!price) {
                    Toast.show(this.props.lang.type === 'vi' ? "Giá không được để trống" : "Price is not emty", Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                }
                else if (!area) {
                    Toast.show(this.props.lang.type === 'vi' ? "Diện tích không được để trống" : "Area is not emty", Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                } else {
                    Toast.show(this.props.lang.type === 'vi' ? "Không thành công. Thử lại" : "Unsuccessfuly. Try again", Toast.SHORT, Toast.TOP, {
                        height: 50,
                        width: 400,
                        backgroundColor: '#ffca00',
                        opacity: 0.5,
                        textAlign: 'center',
                        lines: 1,
                        borderRadius: 3
                    });
                }
            }

        } else {
            Toast.show(this.props.lang.type === 'vi' ? "Thời gian đến phải lớn hơn thời gian bắt đầu" : "End time must be greater than start time", Toast.SHORT, Toast.TOP, {
                height: 50,
                width: 400,
                backgroundColor: '#ffca00',
                opacity: 0.5,
                textAlign: 'center',
                lines: 1,
                borderRadius: 3
            });
        }

        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const initialPosition = JSON.stringify(position);
                    console.log(initialPosition);
                    let lnglat = {
                        1: position.coords.longitude,
                        2: position.coords.latitude,

                    };
                    this.setState({ location: Object.values(lnglat) })
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
        if (this.state.loading) return (<Loading />);
        else return (<View style={{ flex: 1 }}>
            <Toobar leftPress={() => this.props.navigation.goBack()}
                imageLeft={require('../../assets/icons/login_back.png')}
                title={(this.props.lang.type === "vi" ? "Thêm bất động sản" : "Add " + this.props.lang.content.realEstale + "").toUpperCase()} />
            <Content>
                <Content style={{ flex: 1 }}>
                    <View style={{ backgroundColor: '#cfcfcf', height: 35 * g.rh }} />

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
                        {<View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
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
                        <Image source={{ uri: "data:image/png;base64," + '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…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' }}></Image>
                            <View style={{ flexDirection: "row-reverse", alignItems: 'center' }}>
                                {
                                    this.state.image.length > 0 && this.state.image.map((value, index) => { return (<Image key={index} source={{ uri: "data:image/png;base64," + value }} style={{ resizeMode: 'contain', width: 30 * g.rh, height: 30 * g.rh, margin: 10 }} />) })
                                }{
                                    this.state.image.length < 5 && <TouchableOpacity style={{ width: 50 * g.rh, height: 50 * g.rh, borderRadius: 4, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.handleImage()}>
                                        <Text style={{ fontSize: 40, color: '#000', backgroundColor: 'transparent' }}>{"+"}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={{ marginTop: 15 * g.rh }} onPress={() => this.addData()}>
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
                                    (this.props.lang.type == "vi" ? "thêm " : "add ") + this.props.lang.content.realEstale).toUpperCase()}</Text>
                            </View>
                        </TouchableOpacity>
                    </Form>
                </Content>
            </Content>
            {
                /**
                 *
                 */
                this.state.modalType && <MODAL_TYPE modalType={this.state.modalType} onRequestClose={() => this.setState({ modalType: false })} submit={(text) => { this.setState({ type: text, modalType: false }) }} cancel={() => this.setState({ modalType: false })} nameType={this.nameType.bind(this)} onValueChange={(text) => this.setState({ typeIOS: text })} typeIOS={this.state.typeIOS} lang={this.props.lang} type={this.state.type}
                    TYPES={TYPES} />
            }{
                this.state.modalDirection && <MODAL_TYPE modalType={this.state.modalDirection} onRequestClose={() => this.setState({ modalDirection: false })} submit={(text) => { this.setState({ direaction: text, modalDirection: false }) }} cancel={() => this.setState({ modalDirection: false })} nameType={this.nameType.bind(this)} onValueChange={(text) => this.setState({ direactionIOS: text })} typeIOS={this.state.direactionIOS} lang={this.props.lang} type={this.state.direaction}
                    TYPES={DIREACTIONS} />
            }

        </View>)
    }

}
