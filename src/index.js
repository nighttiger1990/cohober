import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './app/Navigator';

class App extends Component {
    constructor() {
        super();
        console.disableYellowBox = true;
    }

    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.navigation,
            })}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
    };
};

export default connect(mapStateToProps)(App);