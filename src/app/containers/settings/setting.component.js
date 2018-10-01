import React from "react";
import {View,Text} from 'react-native';
import * as g from '../../util';
import {List,ListItem,Left,Icon,Body,Switch,Right,Badge} from 'native-base';
import Toolbar from '../components/toolbar/index';
var DeviceInfo = require('react-native-device-info');
class Setting extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
      
    }
    componentWillUnmount(){
        navigator.geolocation.stopObserving();
    }
    render() {
        const version = DeviceInfo.getVersion();
        return (
            <View style={{backgroundColor: '#ffffff', width: g.sw, height: g.sh}}>
                <Toolbar leftPress={()=>this.props.navigation.goBack()} imageLeft={require('../../assets/icons/login_back.png')} title={(this.props.lang.content.setup+"").toUpperCase()}/>
                <View style={{flex:1}}>
                <List>
            <ListItem icon>
              <Left>
                <Icon name="locate" />
              </Left>
              <Body>
                <Text>{this.props.lang.type==="vi"?"Vị trí":"Location"}</Text>
              </Body>
              <Right>
                <Switch value={true} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="cog" />
              </Left>
              <Body>
                <Text>{this.props.lang.type==='vi'?"Cập nhật phần mềm":"Software update"}</Text>
              </Body>
              <Right>
                  <Text>{version+""}</Text>
                {/* <Badge danger>
                    <Text>1</Text>
                </Badge> */}
              </Right>
            </ListItem>
            </List>
                </View>
            </View>
        );
    }
}

export default Setting;