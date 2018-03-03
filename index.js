import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';

import App from './src/App';

const store = configureStore();

// console.disableYellowBox = true;

export default class GithubClient extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('githubclient', () => GithubClient);
