import React, { PureComponent } from 'react';
import { Alert, AsyncStorage, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let g = require('../../../../util/index');
export default class MainSideBar extends PureComponent {

    handleChaneLang = () => {
        requestAnimationFrame(async () => {
            if (this.props.lang.type === 'vi') {
                this.props.onChangeLang('en');
                let lang = await AsyncStorage.setItem('lang', 'en');
                //console.log(lang)
            } else {
                this.props.onChangeLang('vi');
                let lang = await AsyncStorage.setItem('lang', 'vi');
                //console.log(lang)
            }
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            modalVisiable: false
        };
        // console.log(props)
    }

    componentDidMount() {
        console.log(this.props.lang)


    }

    iconLang() {
        if (this.props.lang) {
            return (<View style={{ flexDirection: 'row' }}>
                <View style={{
                    borderWidth: this.props.lang.type === 'vi' ? 2 : 0,
                    borderColor: '#ffca00',
                    marginRight: 2 * g.rw
                }}>
                    <Image source={require('../../../../assets/icons/icon_vn.png')}
                        style={{ width: 40 * g.rw, height: 40 * g.rh, resizeMode: 'contain' }} />
                </View>
                <View style={{
                    borderWidth: this.props.lang.type === 'en' ? 2 : 0,
                    borderColor: '#ffca00',
                    marginLeft: 2 * g.rw
                }}>
                    <Image source={require('../../../../assets/icons/icon_english.png')}
                        style={{ width: 40 * g.rw, height: 40 * g.rh, resizeMode: 'contain' }} />
                </View>

            </View>)
            
        } else return (<View />)
    }

    render() {
        console.log("lang",this.props.lang)
        try {
            if (this.props.user) {
                if ((this.props.user.email + "").toLowerCase() === 'quoctoan.ipp@gmail.com') {
                    this.setState({ isAdmin: true })
                } else {
                    console.log(this.props.user)
                }
            }

        } catch (error) {
            console.log(error)
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#cfcfcf', height: 40 * g.rh }}>
                </View>
                <View style={styles.mainList}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}>
                        <View style={styles.item}>
                            <Image style={styles.iconLeft}
                                source={require('../../../../assets/icons/icon_history.png')} />
                            <Text style={styles.textTitle}>{this.props.lang.content.history}</Text>
                            <Image style={styles.iconRight} source={require('../../../../assets/icons/home_next.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                </View>
                <View style={styles.mainList}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
                        <View style={styles.item}>
                            <Image style={styles.iconLeft} source={require('../../../../assets/icons/icon_bell.png')} />
                            <Text style={styles.textTitle}>{this.props.lang.content.notification + ""}</Text>
                            <Image style={styles.iconRight} source={require('../../../../assets/icons/home_next.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                </View>
                <View style={styles.mainList}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('QuanLyDangTin')
                        }}>
                        <View style={styles.item}>
                            <Image style={styles.iconLeft}
                                source={require('../../../../assets/icons/icon_book.png')} />
                            <Text style={styles.textTitle}>{this.props.lang.content.quanlydangtin}</Text>
                            <Image style={styles.iconRight} source={require('../../../../assets/icons/home_next.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                </View>
                {this.state.isAdmin && <View style={styles.mainList}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Category')
                    }}>
                        <View style={styles.item}>
                            <Image style={styles.iconLeft} source={require('../../../../assets/icons/icon_book.png')} />
                            <Text style={styles.textTitle}>{this.props.lang.content.category}</Text>
                            <Image style={styles.iconRight} source={require('../../../../assets/icons/home_next.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                </View>
                }
                <View style={styles.mainList}>
                    <TouchableOpacity onPress={() => requestAnimationFrame(() => {
                        this.props.navigation.navigate('Setting')
                    })}>
                        <View style={styles.item}>
                            <Image style={styles.iconLeft}
                                source={require('../../../../assets/icons/icon_settings.png')} />
                            <Text style={styles.textTitle}>{this.props.lang.content.setup}</Text>
                            <Image style={styles.iconRight} source={require('../../../../assets/icons/home_next.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                </View>
                <View style={styles.mainList}>
                    <TouchableOpacity onPress={() => requestAnimationFrame(() => {
                        this.props.navigation.navigate('Around')
                    })}>
                        <View style={styles.item}>
                            <Image style={styles.iconLeft}
                                source={require('../../../../assets/icons/icon_location.png')} />
                            <Text style={styles.textTitle}>{this.props.lang.content.nearby + ""}</Text>
                            <Image style={styles.iconRight} source={require('../../../../assets/icons/home_next.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                </View>
                <View style={styles.mainList}>
                    <TouchableOpacity onPress={() => requestAnimationFrame(() => {
                        //this.props.signOut();
                        //    this.setState({modalVisiable:true})
                        Alert.alert(this.props.lang.type === 'vi' ? 'Đăng xuất khỏi Cohober?' : 'Sign out of Cohober?', ' ', [
                            {
                                style: 'cancel',
                                text: this.props.lang.content.cancel + " ",
                            },
                            {
                                style: 'default',
                                text: this.props.lang.content.ok + " ",
                                onPress: () => requestAnimationFrame(() => {
                                    this.props.signOut()
                                })
                            }
                        ])
                    })}>
                        <View style={styles.item}>
                            <Image style={styles.iconLeft} source={require('../../../../assets/icons/logout.png')} />
                            <Text style={styles.textTitle}>{this.props.lang.content.logout}</Text>
                            <Image style={styles.iconRight} source={require('../../../../assets/icons/home_next.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.hr} />
                </View>
                <TouchableOpacity
                    style={{ marginLeft: 20 * g.rw, position: 'absolute', bottom: 0, marginBottom: 20 * g.rh }}
                    onPress={this.handleChaneLang}>
                    {
                        this.iconLang()
                    }
                </TouchableOpacity>
                {this.state.modalVisiable &&
                    <Modal animated={true} transparent={true} visible={this.state.modalVisiable}
                        onRequestClose={() => requestAnimationFrame(() => this.setState({ modalVisiable: false }))}>
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                height: 120 * g.rh,
                                width: g.sw - 60 * g.rw,
                                backgroundColor: '#DDD',
                                borderRadius: 5 * (g.rh + g.rw)
                            }}>

                            </View>

                        </View>
                    </Modal>
                }
            </View>)
    }
}

const styles = StyleSheet.create({
    item: {
        marginTop: 10 * g.rh,
        height: 35 * g.rh,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: 12 * g.rw
    },
    hr: {
        height: 1,
        backgroundColor: '#878787'
    },
    mainList: {
        width: g.sw - 75 * g.rw,
        paddingLeft: 28 * g.rw,
        height: g.rh * 50
    },
    iconLeft: {
        flex: 1 / 5,
        height: 25 * g.rh,
        width: 25 * g.rw,
        resizeMode: 'contain'
    },
    iconRight: {
        flex: 1 / 5,
        height: 20 * g.rh,
        width: 20 * g.rw,
        resizeMode: 'contain'
    },
    textTitle: {
        flex: 3 / 5,
        fontSize: 15,
        fontFamily: 'Roboto-BoldCondensed',
        fontWeight: 'bold'
    }
});
