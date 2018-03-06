import React, { PureComponent } from 'react';
import { View, Text, StatusBar, Modal, TouchableOpacity, WebView, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import WebViewAndroid from 'react-native-webview-crosswalk';

import styles from './styles';

const ANDROID_DEVICE_VERSION = Platform.OS === 'android' ? DeviceInfo.getSystemVersion() : 'whatever';

export default class Web extends PureComponent {
    state = {
        url: '',
        isOpen: false
    }

    handleClose = () => {
        this.setState({ isOpen: false, url: '' });

        StatusBar.setHidden(false);
    }

    handleNavigation = (state = {}) => {
        const { url } = state;

        if (url) {
            if (url.includes('localhost')) {
                const code = url.split('=')[1];

                this.callback(code);

                this.handleClose();
            }
        }
    }

    open = ({ url }, callback) => {
        this.callback = callback;

        StatusBar.setHidden(true);

        this.setState({ url, isOpen: true });
    }

    render() {
        const { isOpen, url } = this.state;

        return isOpen
            ? (
                <View style={styles.background}>
                    <Modal
                        transparent
                        visible        = {isOpen}
                        animationType  = 'slide'
                        onRequestClose = {this.handleClose}
                    >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={this.handleClose}>
                                    <View style={styles.button}>
                                        <Text>Close</Text>
                                    </View>
                                </TouchableOpacity>

                                <Text style={[ styles.text, { fontSize: 16 } ]}>WEB VIEW</Text>

                                <View style={styles.button} />
                            </View>
                            <View style={styles.webview}>
                                {Platform.OS === 'android' && ANDROID_DEVICE_VERSION < '4.5'
                                    ? (
                                        <WebViewAndroid
                                            source      = {{ uri: url }}
                                            renderError = {this.renderError}
                                            style       = {{ flex: 1 }}
                                            onNavigationStateChange = {this.handleNavigation}
                                        />
                                    )
                                    : (
                                        <WebView
                                            source = {{ uri: url }}
                                            onNavigationStateChange = {this.handleNavigation}
                                        />
                                    )}
                            </View>
                        </View>
                    </Modal>
                </View>
            )
            : null;
    }
}
