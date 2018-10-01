import React from 'react';
import {FlatList, View} from 'react-native';
import Toolbar from '../../components/toolbar/index';
import ItemList from './item.category/index'
import styles from './category.style';
import * as g from '../../../util';
import {Content} from "native-base";

export default class CategoryComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff', width: g.sw, height: g.sh}}>
                <Toolbar imageLeft={require('../../../assets/icons/login_back.png')}
                         leftPress={() => requestAnimationFrame(() => this.props.navigation.goBack())}
                         title={this.props.lang.content.category}
                         imageRight={require('../../../assets/icons/icon_edit.png')}
                         rightPress={() => requestAnimationFrame(() => this.props.navigation.navigate('AddCategory'))}/>
                <Content>
                    <View style={[styles.content]}/>
                    {<FlatList style={[styles.listItem]} renderItem={ItemList}
                               data={this.props.data}/>}
                </Content>
            </View>)

    }
}