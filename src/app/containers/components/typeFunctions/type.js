import React from "react";
import {Input, InputGroup, View} from "native-base";
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './type.style';

export default TypeFunction = ({txtIdea = "Ý tưởng", txtRaiseFunding = "Gọi vốn", txtRealEstale = "Bất động sản", txtSecondHand = "Đồ cũ", getListProject, onChangeFunction, currentFunction, typeFunctionVisible}) => {

    return (

        <View style={[styles.container]}>
            <View style={[styles.lineBtnHead]}>
                <TouchableOpacity
                    style={[styles.btnIdea, {backgroundColor:  "#fff"}]}
                    onPress={() => requestAnimationFrame(() => {
                        typeFunctionVisible(false);
                        if (currentFunction !== 'idea') {
                            getListProject('idea');
                        }
                    })}>
                    <Image source={require('../../../assets/icons/lightNoborder.png')} style={[{width:30,height:30,resizeMode:'contain'}]}/>
                    <Text>{txtIdea}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnIdea, {backgroundColor:  "#fff"}]}
                    onPress={() => requestAnimationFrame(() => {
                        if (currentFunction !== 'raiseFunding') {
                            getListProject('raiseFunding');
                        }
                        typeFunctionVisible(false)
                    })}>
                    <Image source={require('../../../assets/icons/moneyNoBorder.png')} style={[{width:30,height:30,resizeMode:'contain'}]}/>
                    <Text>{txtRaiseFunding}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.lineBtnHead]}>
                <TouchableOpacity
                    style={[styles.btnIdea, {backgroundColor:  "#fff"}]}
                    onPress={() => requestAnimationFrame(() => {
                        if (currentFunction !== 'realEstale') {
                            getListProject('realEstale');
                        }
                        typeFunctionVisible(false)
                    })}>
                    <Image source={require('../../../assets/icons/iconbds.png')} style={[{width:30,height:30,resizeMode:'contain'}]}/>
                    <Text>{txtRealEstale}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnIdea, {backgroundColor:"#fff"}]}
                    onPress={() => requestAnimationFrame(() => {
                        if (currentFunction !== 'docu') {
                            getListProject('docu')
                        }
                        typeFunctionVisible(false)
                    })}>
                    <Image source={require('../../../assets/icons/iconsh.png')} style={[{width:30,height:30,resizeMode:'contain'}]}/>
                    <Text>{txtSecondHand}</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
};