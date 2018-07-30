import React, { Component } from 'react';
import { ScrollView, Modal, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import reactotronReactNative from 'reactotron-react-native';
import configUrl from '../../util/configUrl';
const { width, height } = Dimensions.get("window");
class FullScreenImage extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let { index } = this.props.navigation.state.params;
        this.ScrollView.scrollTo({ x: index * width, y: 0, animated: true });
    }

    render() {
        const { listImages, index, isEmptyImages } = this.props.navigation.state.params;
        return (

            <View>
                <TouchableOpacity
                    style={styles.touchBack}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Icon
                        type="Ionicons"
                        name="ios-arrow-back"
                    />
                </TouchableOpacity>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 50 }}
                    ref={(ref) => this.ScrollView = ref}
                >
                    {listImages.map((item, key) => {
                        return (
                            <Image
                                style={{ width: width, height: height }}
                                source={(isEmptyImages) ? item : { uri: configUrl.urlImage + item }}
                                // source={item}
                                resizeMode="contain"
                            />
                        )
                    })}

                </ScrollView>
            </View>
        )
    }


}

export default FullScreenImage;

const styles = {
    touchBack: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
}