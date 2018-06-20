import * as g from "../../../util";
import {Content, Input, Item} from 'native-base';
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export default ContentAddCategory = ({onCreateCategory, lang}) => {
    let name = null;
    const _textInput = (text) => {
        name = text
    };
    const onAdd = () => {
        if (name != null && name !== undefined) {

            onCreateCategory(data)
        }

    };
    return (
        <Content>
            <Item regular style={{
                marginTop: 35 * g.rh,
                marginLeft: 15 * g.rw,
                marginRight: 15 * g.rw,
                backgroundColor: '#cfcfcf',
                height: 65 * g.rh,
                borderRadius: 6 * (g.rh + g.rw)
            }}>
                <Input placeholder={(lang.content.nameCategory).toLowerCase()}
                       returnKeyType={'next'} style={{fontSize: 18, fontFamily: 'Roboto-Condensed'}}
                       onChangeText={_textInput}/>
            </Item>
            <TouchableOpacity style={{marginTop: 15 * g.rh, marginLeft: 15 * g.rw, marginRight: 15 * g.rw}}
                              onPress={onAdd}>
                <View style={{
                    height: 65 * g.rh,
                    backgroundColor: '#ffca00',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6 * (g.rh + g.rw)
                }}>
                    <Text style={{
                        color: '#303030',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-BoldCondensed'
                    }}>{(lang.content.addCategory + '').toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        </Content>
    )
}