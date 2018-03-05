import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initSession } from './actions/session';

import WebView from './components/WebView';

import { webview } from './utils/modals';

import MainPage from './screens/Main';
import LoginPage from './screens/Login';

class SessionManager extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        initSession: PropTypes.func.isRequired
    }

    static defaultProps = {
        isLoggedIn: false
    }

    state = {
        status: 'loading'
    }

    // eslint-disable-next-line
    UNSAFE_componentWillMount() {
        this.props.initSession(
            () => this.setState({ status: 'loaded' })
        );

        StatusBar.setBarStyle('dark-content');
    }

    componentDidMount() {
        const refsInterval = setInterval(() => {
            if (this.webview) {
                webview.setRef(this.webview);

                clearInterval(refsInterval);
            }
        }, 100);
    }

    componentWillUnmount() {
        // DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        // this.backPressSubscriptions.clear();
    }

    handleCloseAll = () => {
        this.datePicker.handleClose();
        this.picker.handleClose();
        this.signature.handleClose();
        this.relationshipToChild.handleClose();
        this.input.handleClose();
    }

    // backPressSubscriptions = new Set()

    render() {
        switch (this.state.status) {
            case 'loading':
                return null;
            case 'loaded':
                return (
                    <View style={{ flex: 1 }}>
                        <StatusBar translucent backgroundColor='transparent' />

                        {this.props.isLoggedIn ? <MainPage /> : <LoginPage />}

                        <WebView
                            ref={item => {
                                this.webview = item;
                            }}
                        />
                    </View>
                );
            default:
                return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.session.isLoggedIn
    };
}


export default connect(mapStateToProps, { initSession })(SessionManager);
