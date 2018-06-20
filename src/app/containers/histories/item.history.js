import moment from "moment/moment";
import * as g from "../../util";
import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export default ItemHistory = ({item, navigation, lang}) => {

    return (<TouchableOpacity
        onPress={() => requestAnimationFrame(() => navigation.navigate('DetailHistory', {id: item.id}))}>
        <View style={{height: 55 * g.rh, flexDirection: 'row', alignItems: 'center'}}>

            <Image source={require('../../assets/icons/icon_history.png')}
                   style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 20, flex: 1 / 7}}/>
            <View style={{flex: 1}}>
                <Text style={{fontFamily: 'Roboto-BoldCondensed', color: '#595959', fontSize: 16}}
                      numberOfLines={1}>{item.action === 'FOLLOW' ? (lang.content.followed + " ") : " "} {item.project.name}</Text>
                <Text style={{
                    fontFamily: 'Roboto-Regular',
                    color: '#595959',
                    fontSize: 9
                }}>{moment(item.createdAt).format('DD-MM-YYYY')}</Text>
            </View>
            <Image source={require('../../assets/icons/home_next.png')} style={{
                flex: 1 / 7,
                width: 20,
                height: 20,
                resizeMode: 'contain',
                margin: 20,
                justifyContent: 'flex-end'
            }}/>
        </View>
        <View style={{height: 1, width: g.sw, backgroundColor: '#878787'}}/>
    </TouchableOpacity>)
}