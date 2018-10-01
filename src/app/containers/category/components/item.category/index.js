import styles from "../category.style";
import {Image, Text, View} from 'react-native';
import React from "react";

const ITEM_LIST = ({item}) => {

    return (<View>
        <View style={[styles.itemCategory]}>
            <Image source={require('../../../../assets/icons/icon_book.png')}
                   style={[styles.itemImage]}/>
            <Text style={[styles.itemName]}> {item.name}</Text>
            <View style={[styles.itemEnd]}/>
        </View>
        <View style={[styles.itemHr]}/>
    </View>)

};
export default ITEM_LIST;