import React from 'react';
import { Image, Linking, Modal, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import styles from "./projectDetail.style";
import * as g from "../../util";
import moment from "moment";
import imagesDefault from '../../assets/image/no-image.png';
import configUrl from '../../util/configUrl';
import { NavigationActions } from 'react-navigation';
import Loading from '../components/loading';

export default class ProjectDetail extends React.PureComponent {
    static navigationOptions = {
        header: null,
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
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            modalVisiable: true
        }
        // console.log(this)
    }
    onPressImages(listImages, index, isEmptyImages) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'FullScreenImage',

            params: {
                listImages: listImages,
                index: index,
                isEmptyImages: isEmptyImages
            },
        });
        this.props.navigation.dispatch(navigateAction);
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params;
        this.props.getProjectID(id);
    }
    componentWillReceiveProps(nextProps) {
        //da fecth data thanh cong
        if (nextProps.project !== this.props.project) {
            this.setState({ loading: false })
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
    checkNullOrUndefined(obj) {
        return obj === null || obj === undefined;
    }
    renderOwner() {
        let { lang } = this.props.lang;
        let dataModal = this.props.project;
        if (dataModal.owner === null || dataModal.owner === undefined) return null;
        let { name, email, phoneNumber } = dataModal.owner;

        return (
            <View style={{ backgroundColor: 'transparent', paddingLeft: 15 * g.rw, marginTop: 13 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={[styles.txtContent, {
                            fontSize: 13 * g.rh
                        }]}
                        numberOfLines={1}
                    >
                        {(lang.content.name + "") + ": "}
                    </Text>
                    {
                        (!this.checkNullOrUndefined(name)) ?
                            <Text
                                style={[styles.txtContent, {
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 13 * g.rh
                                }]}
                                numberOfLines={1}
                                textDecorationLine={'underline'}>
                                {dataModal.owner.name}
                            </Text> : null
                    }

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={[styles.txtContent, {
                            fontSize: 13 * g.rh
                        }]}
                        numberOfLines={1}
                    >
                        {("Mail") + ": "}
                    </Text>
                    {
                        dataModal.owner.email && <Text
                            style={[styles.txtContent, {
                                fontFamily: 'Roboto-Regular', fontSize: 13 * g.rh
                            }]}
                            numberOfLines={1}
                            textDecorationLine={'underline'}
                        >{dataModal.owner.email}</Text>
                    }
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={[styles.txtContent, {
                            fontSize: 13 * g.rh
                        }]}
                        numberOfLines={1}
                    >
                        {(lang.content.phone + "") + ": "}
                    </Text>
                    {
                        (!this.checkNullOrUndefined(phoneNumber)) ?
                            <Text
                                style={[styles.txtContent, {
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 13 * g.rh
                                }]}
                                numberOfLines={1}
                                textDecorationLine={'underline'}
                            >
                                {dataModal.owner.phoneNumber}
                            </Text> : null
                    }
                </View>
            </View>
        )
    }
    render() {
        const dataModal = this.props.project;
        const { lang } = this.props.lang;
        if (this.state.loading) return <Loading />
        const isEmptyImages = (dataModal.images === undefined || dataModal.images === null || dataModal.images.length === 0) ? true : false;
        const listImages = (isEmptyImages === true) ? [imagesDefault, imagesDefault, imagesDefault, imagesDefault, imagesDefault] : dataModal.images;
        return (
            <View style={styles.container}>
                <View
                    style={styles.header}>
                    <View style={styles.header2}>
                        <Text style={styles.txtTitle}
                            numberOfLines={1}>
                            {(dataModal.name + " ").toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.hr} />

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.txtContent, {
                            marginTop: 8 * g.rh,
                            fontFamily: 'Roboto-BoldCondensed',
                            fontSize: 16 * g.rh
                        }]}
                            numberOfLines={1}>
                            {("*" + lang.content.projectInfo + "") + ": "}
                        </Text>

                    </View>
                    <View style={[styles.bgContent, { paddingLeft: 15 * g.rw }]}>
                        {
                            dataModal.category && <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                    numberOfLines={1}>
                                    {lang.content.category + ": "}
                                </Text>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh,
                                    fontFamily: 'Roboto-Regular'
                                }]}
                                    numberOfLines={1}>
                                    {(dataModal.category.name)}
                                </Text>
                            </View>
                        }
                        {
                            dataModal.dienTich && <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                    numberOfLines={1}>{lang.type === "vi" ? "Diện tích" : "Area" + ": "}</Text>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh,
                                    fontFamily: 'Roboto-Regular'
                                }]}
                                    numberOfLines={1}>{(dataModal.dienTich + "m²")}</Text>
                            </View>
                        }

                        {
                            dataModal.huong && <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                    numberOfLines={1}>{lang.type === "vi" ? "Hướng" : "Direction" + ": "}</Text>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh,
                                    fontFamily: 'Roboto-Regular'
                                }]}
                                    numberOfLines={1}>{(this.nameType(dataModal.huong, lang.type) + "")}</Text>
                            </View>
                        }
                        {
                            dataModal.price && <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                    numberOfLines={1}>{lang.type === "vi" ? "Giá" : "Price" + ": "}</Text>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh,
                                    fontFamily: 'Roboto-Regular'
                                }]}
                                    numberOfLines={1}>{(dataModal.price + "vnd")}</Text>
                            </View>
                        }
                        {
                            dataModal.address && <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                    numberOfLines={1}>{lang.type === "vi" ? "Địa chỉ" : "Address" + ": "}</Text>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh,
                                    fontFamily: 'Roboto-Regular'
                                }]}
                                    numberOfLines={1}>{(dataModal.address)}</Text>
                            </View>
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                numberOfLines={1}>{lang.content.startDate + ": "}</Text>
                            <Text style={[styles.txtContent, {
                                fontSize: 13 * g.rh,
                                fontFamily: 'Roboto-Regular'
                            }]}
                                numberOfLines={1}>{(moment(dataModal.startDate).format('DD-MM-YYYY'))}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                numberOfLines={1}>{lang.content.endDate + ": "}</Text>
                            <Text style={[styles.txtContent, {
                                fontSize: 13 * g.rh,
                                fontFamily: 'Roboto-Regular'
                            }]}
                                numberOfLines={1}>{(moment(dataModal.endDate).format('DD-MM-YYYY'))}</Text>
                        </View>
                        {dataModal.type === 'raiseFunding' ?
                            <View>
                                <View style={[{ flexDirection: 'row' }]}>
                                    <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                        numberOfLines={1}>{lang.content.money + ": "}
                                    </Text>
                                    <Text
                                        style={[styles.txtContent, {
                                            fontSize: 13 * g.rh
                                        }]}>
                                        {dataModal.raiseMoney ? " " + g.formatNumber(dataModal.raiseMoney) + " vnđ" : " 0 vnđ"}
                                    </Text>
                                </View>
                            </View> : null}
                        <View style={{ flexDirection: 'row', height: 42 * g.rh }}>
                            <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                numberOfLines={1}>{lang.content.content + ": "}
                            </Text>
                            <Text style={[styles.txtContent, {
                                fontSize: 13 * g.rh,
                                fontFamily: 'Roboto-Regular',
                                width: g.sw - 150 * g.rw,
                                lineHeight: 14 * g.rh
                            }]}
                                numberOfLines={3}>{(dataModal.detail)}
                            </Text>
                        </View>
                    </View>
                    {/* view images */}
                    <View style={{ flexDirection: 'row', marginTop: 13 }}>

                        <Text style={[styles.txtContent, {
                            marginTop: dataModal.type === 'raiseFunding' ? 13 * g.rh : 0,
                            fontFamily: 'Roboto-BoldCondensed',
                            fontSize: 16 * g.rh
                        }]}
                            numberOfLines={1}>{("*" + lang.content.images + "") + ": "}
                        </Text>

                    </View>
                    <View style={{ paddingLeft: 15 * g.rw }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listImages.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.onPressImages(listImages, index, isEmptyImages)}
                                    >
                                        <Image
                                            style={{ width: 50, height: 50, marginRight: 5, borderWidth: 0.5, borderColor: "black" }}
                                            source={(isEmptyImages) ? item : { uri: configUrl.urlImage + item }}
                                            resizeMode="center"
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>

                    {/* ket thuc view images */}

                    <View style={{ flexDirection: 'row', marginTop: 13 }}>

                        <Text style={[styles.txtContent, {
                            marginTop: dataModal.type === 'raiseFunding' ? 13 * g.rh : 0,
                            fontFamily: 'Roboto-BoldCondensed',
                            fontSize: 16 * g.rh
                        }]}
                            numberOfLines={1}>{("*" + lang.content.contact + "") + ": "}
                        </Text>

                    </View>

                    {this.renderOwner()}

                    <View style={styles.bgBottom}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={this.handleCall}>
                            <Image source={require('../../assets/icons/icon_call.png')} style={{
                                width: 50 * g.rw,
                                height: 50 * g.rh,
                                resizeMode: 'contain'
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={this.handleMessage}>
                            <Image source={require('../../assets/icons/messages.png')} style={{
                                width: 50 * g.rw,
                                height: 50 * g.rh,
                                resizeMode: 'contain'
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={this.handleSave}>
                            <Image source={require('../../assets/icons/icon_save.png')} style={{
                                width: 50 * g.rw,
                                height: 50 * g.rh,
                                resizeMode: 'contain'
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={this.handleClose}>
                            <Image source={require('../../assets/icons/ic_close_red.png')}
                                style={{
                                    width: 50 * g.rw,
                                    height: 50 * g.rh,
                                    resizeMode: 'contain'
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>
                {(moment(dataModal.endDate).isBefore(moment())) ? (
                    <View style={{
                        width: 300 * g.rw,
                        height: 100 * g.rh,
                        position: 'absolute'
                    }}>
                        <Text style={{ fontFamily: 'UTM Colossalis', color: '#b32b30', fontSize: 25, textAlign: 'center', transform: [{ rotate: '30deg' }] }}> {lang.type === 'vi' ? "Đã Hết hạn".toUpperCase() : "Expired".toUpperCase()}</Text>
                    </View>
                ) : null}

            </View>
        )
    }


}