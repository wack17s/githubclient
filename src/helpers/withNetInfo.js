import React, { PureComponent } from 'react';
import { NetInfo } from 'react-native';

export default function withNetInfo(WrappedComponent) {
    return class extends PureComponent {
        state = {
            isConnected: null,
            isReady: false
        }

        componentWillMount() {
            NetInfo.isConnected.addEventListener('connectionChange', this.handleChange);

            this.initialConnection();
        }

        componentWillUnmount() {
            NetInfo.isConnected. removeEventListener('connectionChange', this.handleChange);
        }

        handleChange = isConnected => {
            this.setState({ isConnected });
        }

        initialConnection = async () => {
            const isConnected = await NetInfo.isConnected.fetch();

            this.setState({ isReady: true, isConnected });
        }

        render() {
            const { isConnected, isReady } = this.state;

            return isReady && <WrappedComponent isConnected={isConnected} {...this.props} />;
        }
    };
}
