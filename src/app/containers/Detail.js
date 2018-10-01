import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../actions';
import {Button, Content, Header, Left, Right, Title} from 'native-base';

let g = require('../util');

class DetailProject extends React.Component {
    static navigationOptions = () => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        // console.log(this.props.navigation.state.params.id)
        this.props.onFetch(this.props.navigation.state.params.id);
        setTimeout(() => this.setState({isLoading: false}), 3000)
    }

    render() {
        if (this.state.isLoading || this.props.project.isLoading) {
            return (<View style={styles.bgLoading}>
                    <ActivityIndicator
                        color={'#ffca00'}
                        size={'large'}
                        renderToHardwareTextureAndroid={true}
                        animating={true}/>
                </View>
            )
        } else {
            return (<View style={{flex: 1}}>
                <Header style={{backgroundColor: '#ffca00'}} androidStatusBarColor="#ffca00">
                    <Left>
                        <Button transparent delayLongPress={500} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image style={{width: 25 * g.rw, height: 25 * g.rh, resizeMode: 'contain'}}
                                   source={require('../assets/icons/login_back.png')}/>
                        </Button>
                    </Left>
                    <Title style={{
                        alignSelf: 'center',
                        color: '#383838',
                        fontFamily: 'Roboto-BoldCondensed',
                        backgroundColor: 'rgba(255,255,255,0)'
                    }}>{(this.props.lang.content.detailHistory + "").toUpperCase()}</Title>
                    <Right/>
                </Header>
                <Content/>
            </View>)
        }

    }

}

const styles = StyleSheet.create({
    bgLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: g.sw,
        height: g.sh
    },
    txtNoData: {
        fontFamily: 'Roboto-Condensed',
        color: '#383838',
        alignSelf: 'center',
        marginTop: 15 * g.rh,
        opacity: 0.5
    },
    bgHr: {
        height: 35 * g.rh,
        width: g.sw,
        backgroundColor: '#cfcfcf'
    }
});
const mapStateToProps = (state) => {
    return {
        project: state.project,
        lang: state.language.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (id) => dispatch(actions.getProjectID(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject);