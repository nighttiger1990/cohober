import React, { Component } from 'react';
import { Body, Button, Header, Left, Right, Title } from 'native-base';
import { TouchableOpacity, Image } from 'react-native';
import TypeFunction from '../components/typeFunctions/type';
import * as g from '../../util';
class HeaderQuanLyDangTin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeVisible: false,
        }
    }
    setVisiable(visiable) {
        this.setState({
            typeVisible: visiable
        });
        this.props.showType();
    }

    render() {
        let typeVisible = this.state.typeVisible;
        let title = this.props.title;
        return (
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
                        onPress={() => {
                            this.setVisiable(!this.state.typeVisible);
                        }}>
                        <Title style={[{
                            fontSize: 18,
                            fontFamily: 'Roboto-BoldCondensed',
                            color: '#383838',
                            alignSelf: 'center'
                        }]}
                        >{title}</Title>
                        <Image style={{
                            resizeMode: 'contain',
                            width: 15,
                            height: 15,
                            alignSelf: 'center',
                            marginLeft: 5
                        }}
                            source={typeVisible ? require('../../assets/icons/arrow_dropdown.png') : require('../../assets/icons/arrow_dropup.png')} />
                    </TouchableOpacity>
                </Body>

                <Right />
            </Header>
        )
    }
}
export default HeaderQuanLyDangTin;