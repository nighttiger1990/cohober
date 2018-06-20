import styles from "./loading.style";
import {ActivityIndicator, View} from 'react-native';
import React from 'react'
import HComponent from "../../common/HComponent";

export default class Loading extends HComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.bgLoading}>
                <ActivityIndicator
                    animating={true}
                    color={'#ffca00'}
                    size={'large'}
                    renderToHardwareTextureAndroid={true}/>
            </View>)
    }
}