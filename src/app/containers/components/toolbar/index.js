import {Image, TouchableOpacity} from 'react-native';
import {Button, Header, Left, Right, Title} from 'native-base';
import React from "react";
import * as g from '../../../util';
import HComponent from "../../common/HComponent";
import styles from "./styles";

export default class ToolBar extends HComponent {

    constructor(props) {
        super(props);

    }

    render() {
        const {leftPress,imageLeft,title,rightPress,imageRight} =this.props;
        return (
            <Header style={[styles.header]} androidStatusBarColor="#ffca00">

                <Left>
                    {
                       leftPress &&
                        <Button transparent delayLongPress={500} onPress={leftPress}>
                            {imageLeft &&
                            <Image style={[styles.imageLeft]}
                                   source={imageLeft}/>}
                        </Button>
                    }

                </Left>
                {title && <Title style={[styles.title]}>{title}</Title>}

                <Right>
                    {rightPress &&
                    <TouchableOpacity style={[styles.btnRight]}
                                      onPress={rightPress}>
                        {imageRight &&
                        <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'stretch'}}
                               source={imageRight}/>}

                    </TouchableOpacity>
                    }
                </Right>
            </Header>)
    }
}
ToolBar.defaultProps = {
    leftPress: null,
    imageLeft: null,
    title: null,
    rightPress: null,
    imageRight: null
};