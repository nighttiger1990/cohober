import React, { Component } from 'react';
import { ActivityIndicator, Image, Modal, Picker, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Button, Content, Form, Header, Icon, Input, Item, Left, Right, Title } from 'native-base';
import moment from 'moment';
import DatePicker from '../components/datepicker';
import Loading from "../components/loading";
import validate from 'validate.js';
import * as g from '../../util';
import Toast, { DURATION } from 'react-native-easy-toast';
import { connect } from 'react-redux';
import actions from "../../actions";
class RaiseFunding extends React.Component {
    static navigationOptions = {
        header: null
    };
    checkDate = (text) => {
        const regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
        return regex_date.test(text);
    };
    showToast(message) {
        this.refs.toast.show(message);
    }

    constructor(props) {
        super(props);
        this.state = {
            endDate: moment().add(1, 'year').format("YYYY-MM-DD"),
            startDate: moment().format("YYYY-MM-DD") + "",
            name: null,
            detail: null,
            note: null,
            raiseMoney: null,
            location: [],
            modalVisiable: false,
            category: 0,
            date: new Date(),
            listCategory: [],
            phoneNumber: null,
            isLoading: true,
            modalVisiable2: false,
            categoryModal: null,
            categoryName: null
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
                (error) => { }
            );
        } catch (error) {
            console.log(error)
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.category.data !== nextProps.category.data) {
            this.setState({ listCategory: nextProps.category.data })
        } else {
            this.setState({ listCategory: this.props.category.data })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true;
        }
        return this.props !== nextProps;
    }

    componentDidMount() {
        this.props.onGetCategory();
        setTimeout(() => this.setState({ isLoading: false }), 3000)
    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    addData() {

        if (Platform.OS === 'android') {
            if (validate.isEmpty(this.state.name)) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng nhập dự án gọi vốn" : 'Please type raise funding project name')
                this.CustomButton.turnOffLoading();
            }
            if ((this.state.category) === 0) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng chọn lĩnh vực" : 'Please select category')
                this.CustomButton.turnOffLoading();
            }
            if (!validate.isNumber(parseFloat(this.state.raiseMoney))) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng nhập số tiền cần gọi vốn" : 'Please type raise money')
                this.CustomButton.turnOffLoading();
            }
            if (validate.isEmpty(this.state.detail)) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng nhập ghi chú" : 'Please type note')
                this.CustomButton.turnOffLoading();
            }
        } else {
            if (validate.isEmpty(this.state.detail)) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng nhập ghi chú" : 'Please type note')
                this.CustomButton.turnOffLoading();
            }
            if (!validate.isNumber(parseFloat(this.state.raiseMoney))) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng nhập số tiền cần gọi vốn" : 'Please type raise money')
                this.CustomButton.turnOffLoading();
            }
            if ((this.state.category) === 0) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng chọn lĩnh vực" : 'Please select category')
                this.CustomButton.turnOffLoading();
            }
            if (validate.isEmpty(this.state.name)) {
                this.showToast(this.props.lang.type === 'vi' ? "Vui lòng nhập tên dự án" : 'Please type project name')
                this.CustomButton.turnOffLoading();
            }
        }

        if (this.state.location.length > 0) {
            if (!this.checkDate(this.state.startDate)) {
                this.showToast(this.props.lang.type === 'vi' ? "Thời gian bắt đầu không đúng định dạng\n Năm-tháng-ngày" : "The start time is not in the correct format\n YYYY-MM-DD")
                this.CustomButton.turnOffLoading();
            } else if (!this.checkDate(this.state.endDate)) {
                this.showToast(this.props.lang.type === 'vi' ? "Thời gian kết thúc không đúng định dạng\n Năm-tháng-ngày" : "The end time is not in the correct format\n YYYY-MM-DD")
                this.CustomButton.turnOffLoading();
            } else {
                let start = moment(this.state.startDate).unix();
                let end = moment(this.state.endDate).unix();
                if (end > start) {
                    let data = {
                        name: this.state.name,
                        detail: this.state.detail,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        location: this.state.location,
                        type: 'raiseFunding',
                        category: this.state.category,
                        phoneNumber: this.state.phoneNumber,
                        raiseMoney: parseFloat(this.state.raiseMoney)
                    };
                    if (!validate.isEmpty(this.state.name) && (this.state.category) !== 0 && validate.isNumber(parseFloat(this.state.raiseMoney)) && !validate.isEmpty(this.state.detail)) {
                        this.props.onAdd(data, async (message) => {
                            await this.props.getListProject(this.props.functions.type);
                            this.showToast(message);
                            setTimeout(() => {
                                this.props.navigation.goBack();
                            }, 2000)
                        })
                    }
                } else {
                    this.showToast(this.props.lang.type === 'vi' ? "Thời gian đến phải lớn hơn thời gian bắt đầu" : "End time must be greater than start time")
                    this.CustomButton.turnOffLoading();

                }
            }
        } else {
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
                    (error) => { }
                );
            } catch (error) {
                console.log(error)
            }

        }
    }

    render() {
        //   console.log(this.state.category);
        if (this.state.isLoading) {
            return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={'#ffca00'} />
            </View>)
        } else
            return (
                // <ScrollView style={{backgroundColor: '#ffffff', width: g.sw, height: g.sh}}>
                <View style={{ flex: 1 }}>
                    <Header style={{ backgroundColor: '#ffca00' }} androidStatusBarColor="#ffca00">
                        <Left>
                            <Button transparent delayLongPress={500} onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                                <Image style={{ width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain' }}
                                    source={require('../../assets/icons/login_back.png')} />
                            </Button>
                        </Left>
                        <Title style={{
                            alignSelf: 'center',
                            color: '#383838',
                            fontFamily: 'Roboto-BoldCondensed'
                        }}>{(this.props.lang.content.addFunding + "").toUpperCase()}</Title>
                        <Right />
                    </Header>
                    <Content>
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
                            {<View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                                <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                    <Text style={{
                                        fontFamily: 'Roboto-BoldCondensed',
                                        color: '#595959',
                                        fontWeight: 'bold'
                                    }}>{this.props.lang.content.category + ''}</Text>
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
                                            borderColor: this.state.category !== 0 ? 'transparent' : '#ff0000',
                                            borderWidth: this.state.category !== 0 ? 0 : 1
                                        }}
                                            onPress={() => requestAnimationFrame(() => this.setState({ modalVisiable2: true }))}>
                                            <Text style={{
                                                fontFamily: 'Roboto-Condensed',
                                                fontSize: 15 * g.rw
                                            }}>{this.state.categoryName ? (this.state.categoryName) : (this.props.lang.type === "vi" ? 'Vui lòng chọn' : 'Select one')}</Text>
                                        </TouchableOpacity>
                                    ) : (<Picker selectedValue={this.state.category} style={{
                                        flex: 1,
                                        borderRadius: 6 * (g.rh + g.rw),
                                        borderColor: this.state.category !== 0 ? '#cfcfcf' : '#ff0000',
                                        borderWidth: this.state.category !== 0 ? 0 : 1
                                    }} itemStyle={{
                                        borderColor: '#cfcfcf',
                                        backgroundColor: '#cfcfcf',
                                        justifyContent: 'center',
                                        height: 50 * g.rh,
                                        borderRadius: 6 * (g.rh + g.rw),
                                        fontFamily: 'Roboto-Condensed',
                                        fontSize: 15 * g.rw
                                    }} onValueChange={(value) => this.setState({ category: value })}>
                                        <Picker.Item value={0}
                                            label={this.props.lang.type === "vi" ? 'Vui lòng chọn' : 'Select one'} />
                                        {
                                            this.state.listCategory && this.state.listCategory.map((value, index) => {
                                                return (<Picker.Item key={index} value={value.key}
                                                    label={(value.name + "").toUpperCase()} />)
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
                                    }}>{this.props.lang.content.money}</Text>
                                </View>
                                <Item regular
                                    style={{ backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw) }}
                                    error={!validate.isNumber(parseFloat(this.state.raiseMoney))}>
                                    <Input
                                        placeholder={(this.props.lang.content.typeInp + ' ' + this.props.lang.content.money).toLowerCase()}
                                        returnKeyType={'next'} keyboardType={'numeric'} multiline={false}
                                        style={{ fontSize: 18, fontFamily: 'Roboto-Condensed' }}
                                        onChangeText={(text) => this.setState({ raiseMoney: text })} />
                                </Item>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 * g.rh }}>
                                <View style={{ alignSelf: 'center', flex: 1 / 3 }}>
                                    <Text style={{
                                        fontFamily: 'Roboto-BoldCondensed',
                                        color: '#595959',
                                        fontWeight: 'bold',
                                        fontSize: 15 * g.rw
                                    }}>{this.props.lang.content.note + ""}</Text>
                                </View>
                                <Item regular
                                    style={{ backgroundColor: '#cfcfcf', flex: 1, borderRadius: 6 * (g.rh + g.rw) }}
                                    error={validate.isEmpty(this.state.detail)}>
                                    <Input placeholder={(this.props.lang.content.note + "").toLowerCase()}
                                        enablesReturnKeyAutomatically={true} returnKeyType={'done'} multiline={true}
                                        style={{ fontSize: 18, fontFamily: 'Roboto-Condensed', minHeight: 100 * g.rh }}
                                        onChangeText={(text) => this.setState({ detail: text })} />
                                </Item>
                            </View>
                            <CustomButton
                                lang={this.props.lang}
                                addData={() => this.addData()}
                                ref={(ref) => this.CustomButton = ref}
                            />
                        </Form>
                    </Content>
                    {
                        /**
                         *
                         */
                        this.state.modalVisiable2 && <Modal
                            transparent={true}
                            animationType="none"
                            visible={this.state.modalVisiable2}
                            onRequestClose={() => {
                                this.setState({ modalVisiable2: false });
                            }}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ marginTop: g.sh - 200 * g.rh, bottom: 0, backgroundColor: '#fff' }}>
                                    <View style={{
                                        height: 40 * g.rh,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingLeft: 8 * g.rw,
                                        paddingRight: 8 * g.rw
                                    }}>
                                        <TouchableOpacity style={{ left: 0 }} onPress={() => requestAnimationFrame(() => {
                                            try {
                                                this.setState({
                                                    modalVisiable2: false
                                                })
                                            } catch (error) {

                                                console.log(error)
                                            } finally {
                                                this.setState({ modalVisiable2: false })
                                            }
                                        })}>
                                            <Text
                                                style={{ color: '#ff0000' }}>{this.props.lang.content.cancel + " "}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ right: 0 }}
                                            onPress={() => requestAnimationFrame(() => {
                                                try {
                                                    this.setState({
                                                        modalVisiable2: false,
                                                        categoryName: this.state.listCategory[this.state.categoryModal].name,
                                                        category: this.state.listCategory[this.state.categoryModal].key
                                                    })
                                                } catch (error) {

                                                    console.log(error)
                                                } finally {
                                                    this.setState({ modalVisiable2: false })
                                                }
                                            })}>
                                            <Text
                                                style={{ color: '#00ff00' }}>{this.props.lang.content.confirm + " "}</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ height: 1, backgroundColor: '#383838' }} />
                                    <Picker selectedValue={this.state.categoryModal}
                                        style={{ flex: 1, borderWidth: 2, borderColor: '#cfcfcf' }} itemStyle={{
                                            backgroundColor: '#fff',
                                            justifyContent: 'center',
                                            fontFamily: 'Roboto-Condensed',
                                            fontSize: 18 * g.rw,
                                        }} onValueChange={(value) => this.setState({ categoryModal: value })}>
                                        <Picker.Item value={0}
                                            label={this.props.lang.type === "vi" ? 'Vui lòng chọn' : 'Select one'} />
                                        {
                                            this.state.listCategory && this.state.listCategory.map((value, index) => {
                                                return (<Picker.Item key={index} value={index}
                                                    label={(value.name + "").toUpperCase()} />)
                                            })
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </Modal>

                    }
                    <Toast
                        ref="toast"
                        position='top'
                        positionValue={10} />
                </View>
            );
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
                            }}>{(lang.content.addFunding).toUpperCase()}
                            </Text>
                    }

                </View>
            </TouchableOpacity>
        )

    }
}


const mapStateToProps = (state) => {
    return {
        category: state.category,
        lang: state.language.lang,
        functions: state.functions,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data, callback) => dispatch(actions.createProject(data, callback)),
        onGetCategory: () => {
            dispatch(actions.getCategories())
        },
        getListProject: (type) => {
            dispatch(actions.getProjects(type))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RaiseFunding);