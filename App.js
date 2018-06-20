import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Application from './src/index';
import configureStore from './src/app/store';

const store = configureStore();
export default class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Application/>
            </Provider>
        );
    }
}

