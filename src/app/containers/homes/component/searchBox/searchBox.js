import React from "react";
import {Input, InputGroup, View} from "native-base";
import styles from './searchBox.style';

export default SearchBox = ({getAddressPredictions}) => {
    function handleInput(text) {
        //console.log(text);
        getAddressPredictions(text)
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.inputWrapper]}>
                <InputGroup>
                    <Input
                        style={styles.inputSearch}
                        placeholder="Choose pick-up location"
                        onChangeText={handleInput.bind(this)}
                    />
                </InputGroup>
            </View>
        </View>
    )
};