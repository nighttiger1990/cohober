import styles from "./loading.style";
import { ActivityIndicator, View } from 'react-native';
import React, { Component } from 'react'

export default class Loading extends Component {

    render() {
        return (
            <View style={styles.bgLoading}>
                <ActivityIndicator
                    animating={true}
                    color={(!this.props.color) ? '#ffca00' : this.props.color}
                    size={'large'}
                    renderToHardwareTextureAndroid={true} />
            </View>
        )
    }
}