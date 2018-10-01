import React from 'react';
import {Modal,View,TouchableOpacity,Text,Picker}from'react-native';
import * as g from '../../../util/index';
export default MODAL_TYPE=({modalType,onRequestClose,submit,cancel,nameType,onValueChange,typeIOS,type,lang,TYPES})=>{

    return(<Modal
        transparent={true}
        animationType="none"
        visible={modalType}
        onRequestClose={onRequestClose}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={{marginTop: g.sh - 200 * g.rh, bottom: 0, backgroundColor: '#fff'}}>
                <View style={{
                    height: 40 * g.rh,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 8 * g.rw,
                    paddingRight: 8 * g.rw
                }}>
                    <TouchableOpacity style={{left: 0}} onPress={cancel}>
                        <Text
                            style={{color: '#ff0000'}}>{lang.content.cancel + " "}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{right: 0}}
                                      onPress={() => requestAnimationFrame(() => {
                                          try {
                                             
                                              submit(TYPES[typeIOS].key)
                                          } catch (error) {

                                              console.log(error)
                                          } 
                                      })}>
                        <Text
                            style={{color: '#00ff00'}}>{lang.content.confirm + " "}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{height: 1, backgroundColor: '#383838'}}/>
                <Picker selectedValue={typeIOS}
                        style={{flex: 1, borderWidth: 2, borderColor: '#cfcfcf'}} itemStyle={{
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    fontFamily: 'Roboto-Condensed',
                    fontSize: 18 * g.rw,
                }} onValueChange={onValueChange}>
                    <Picker.Item value={0}
                                 label={lang.type === "vi" ? 'Vui lòng chọn' : 'Select one'}/>
                    {
                        TYPES.map((value, index) => {
                            return (<Picker.Item key={index} value={index}
                                                 label={(nameType(value.key,lang.type) + "").toUpperCase()}/>)
                        })
                    }
                </Picker>
            </View>
        </View>
    </Modal>)
}
