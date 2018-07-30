import styles from "../home.style";
import moment from "moment";
import { ActivityIndicator, Image, Modal, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import reactotronReactNative from "reactotron-react-native";
import configUrl from "../../../util/configUrl";
import imagesDefault from '../../../assets/image/no-image.png';
const URM_IMAGES = 'http://cohober.cf/api/image/';
const g = require('../../../util/index');
const PROJECT_DETAIL = ({ modalVisible, onRequestClose, lang, dataModal, handleClose, handleSave, handleCall, handleMessage, onPressImages }) => {
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    const closeModal = () => {
        onRequestClose(false)
    };
    function nameType(text, lang = 'en') {
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
    reactotronReactNative.log("dataModal", dataModal);
    reactotronReactNative.log("Lang xxxx", lang.content);
    if (dataModal === null) return <View><Text>Loading...!!!</Text></View>
    const listImages = (dataModal.images === undefined || dataModal.images.length === 0) ? [imagesDefault, imagesDefault, imagesDefault, imagesDefault, imagesDefault] : dataModal.images;
    // const listImages1 = [imagesDefault, imagesDefault, imagesDefault, imagesDefault, imagesDefault];
    const isEmptyImages = (dataModal.images === undefined || dataModal.images.length === 0) ? true : false;

    return (
        <Modal
            animationType="none"
            transparent={true}
            animated={modalVisible}
            visible={modalVisible}
            onRequestClose={() => requestAnimationFrame(closeModal)}>

            <View style={styles.container}>
                <View
                    style={[styles.header]}>
                    <View>
                    </View>
                    <View style={styles.header2}>
                        <Text style={styles.txtTitle}
                            numberOfLines={1}>{(dataModal.name + " ").toUpperCase()}</Text>
                    </View>
                    <View style={styles.hr} />

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.txtContent, {
                            marginTop: 8 * g.rh,
                            fontFamily: 'Roboto-BoldCondensed',
                            fontSize: 16 * g.rh
                        }]}
                            numberOfLines={1}>{("*" + lang.content.projectInfo + "") + ": "}</Text>

                    </View>

                    <View style={[styles.bgContent, { paddingLeft: 15 * g.rw }]}>
                        {
                            dataModal.category && <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                    numberOfLines={1}>{lang.content.category + ": "}</Text>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh,
                                    fontFamily: 'Roboto-Regular'
                                }]}
                                    numberOfLines={1}>{(dataModal.category.name)}</Text>
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
                                    numberOfLines={1}>{(nameType(dataModal.huong, lang.type) + "")}</Text>
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
                            <View><View style={[{ flexDirection: 'row' }]}>
                                <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                    numberOfLines={1}>{lang.content.money + ": "}</Text><Text
                                        style={[styles.txtContent, {
                                            fontSize: 13 * g.rh
                                        }]}>{dataModal.raiseMoney ? " " + formatNumber(dataModal.raiseMoney) + " vnđ" : " 0 vnđ"}</Text>
                            </View></View> : null}
                        <View style={{ flexDirection: 'row', height: 42 * g.rh }}>
                            <Text style={[styles.txtContent, { fontSize: 13 * g.rh }]}
                                numberOfLines={1}>{lang.content.content + ": "}</Text>
                            <Text style={[styles.txtContent, {
                                fontSize: 13 * g.rh,
                                fontFamily: 'Roboto-Regular',
                                width: g.sw - 150 * g.rw,
                                lineHeight: 14 * g.rh
                            }]}
                                numberOfLines={3}>{(dataModal.detail)}</Text>
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
                                        onPress={() => onPressImages(listImages, index, isEmptyImages)}
                                    >
                                        <Image
                                            style={{ width: 50, height: 50, marginRight: 5, borderWidth: 0.5 }}
                                            source={(isEmptyImages) ? item : { uri: configUrl.urlImage + item }}
                                            resizeMode="center"
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                    {/* ket thuc view image */}
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={[styles.txtContent, {
                            marginTop: dataModal.type === 'raiseFunding' ? 13 * g.rh : 0,
                            fontFamily: 'Roboto-BoldCondensed',
                            fontSize: 16 * g.rh
                        }]}
                            numberOfLines={1}>{("*" + lang.content.contact + "") + ": "}</Text>

                    </View>
                    {
                        dataModal.owner ? <View style={{ backgroundColor: 'transparent', paddingLeft: 15 * g.rw }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh
                                }]}
                                    numberOfLines={1}>{(lang.content.name + "") + ": "}</Text>
                                {dataModal.owner.name && <Text style={[styles.txtContent, {
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 13 * g.rh
                                }]} numberOfLines={1}
                                    textDecorationLine={'underline'}>{"" + (dataModal.owner.name ? dataModal.owner.name : '')}</Text>}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh
                                }]}
                                    numberOfLines={1}>{("Mail") + ": "}</Text>
                                {dataModal.owner.email && <Text style={[styles.txtContent, {
                                    fontFamily: 'Roboto-Regular', fontSize: 13 * g.rh
                                }]} numberOfLines={1}
                                    textDecorationLine={'underline'}>{"" + (dataModal.owner.email ? dataModal.owner.email : '')}</Text>
                                }
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtContent, {
                                    fontSize: 13 * g.rh
                                }]}
                                    numberOfLines={1}>{(lang.content.phone + "") + ": "}</Text>
                                {dataModal.owner.phoneNumber && <Text style={[styles.txtContent, {
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 13 * g.rh
                                }]} numberOfLines={1}
                                    textDecorationLine={'underline'}>{"" + (dataModal.owner.phoneNumber ? dataModal.owner.phoneNumber : '')}</Text>
                                }
                            </View>
                        </View> :
                            <View style={{ backgroundColor: 'transparent', paddingLeft: 15 * g.rw }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.txtContent, {
                                        fontSize: 13 * g.rh
                                    }]}
                                        numberOfLines={1}>{(lang.content.name + "") + ": "}</Text>
                                    {<Text style={[styles.txtContent, {
                                        fontFamily: 'Roboto-Regular',
                                        fontSize: 13 * g.rh
                                    }]} numberOfLines={1}
                                        textDecorationLine={'underline'} />}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.txtContent, {
                                        fontSize: 13 * g.rh
                                    }]}
                                        numberOfLines={1}>{("Mail") + ": "}</Text>
                                    {<Text style={[styles.txtContent, {
                                        fontFamily: 'Roboto-Regular', fontSize: 13 * g.rh
                                    }]} numberOfLines={1}
                                        textDecorationLine={'underline'} />
                                    }
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.txtContent, {
                                        fontSize: 13 * g.rh
                                    }]}
                                        numberOfLines={1}>{(lang.content.phone + "") + ": "}</Text>
                                    {<Text style={[styles.txtContent, {
                                        fontFamily: 'Roboto-Regular',
                                        fontSize: 13 * g.rh
                                    }]} numberOfLines={1}
                                        textDecorationLine={'underline'} />
                                    }
                                </View>
                            </View>
                    }

                    <View style={styles.bgBottom}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={handleCall}>
                            <Image source={require('../../../assets/icons/icon_call.png')} style={{
                                width: 50 * g.rw,
                                height: 50 * g.rh,
                                resizeMode: 'contain'
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={handleMessage}>
                            <Image source={require('../../../assets/icons/messages.png')} style={{
                                width: 50 * g.rw,
                                height: 50 * g.rh,
                                resizeMode: 'contain'
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={handleSave}>
                            <Image source={require('../../../assets/icons/icon_save.png')} style={{
                                width: 50 * g.rw,
                                height: 50 * g.rh,
                                resizeMode: 'contain'
                            }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5 * g.rw }}
                            onPress={handleClose}>
                            <Image source={require('../../../assets/icons/ic_close_red.png')}
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

        </Modal>
    )
};
export default PROJECT_DETAIL;