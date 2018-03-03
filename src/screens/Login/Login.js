import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { alert } from '../../utils/alert';

import { loginUser } from '../../actions/session';

import styles from './styles';

class Login extends PureComponent {
    static propTypes = {
        loginUser: PropTypes.func.isRequired
    }

    state = {
        isLoading: false
    }

    handleSignInPress = () => {
        if (!this.requestInProcess) {
            this.requestInProcess = true;

            this.setState({ isLoading: true });

            this.props.loginUser(
                () => {
                    this.requestInProcess = false;

                    this.setState({ isLoading: false });
                },
                (error) => {
                    alert(error, 'Login error');

                    this.setState({ isLoading: false });

                    this.requestInProcess = false;
                }
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.handleSignInPress}>
                    <View style={styles.button}>
                        {!this.state.isLoading
                            ? <Text style={styles.text}>Log In with GitHub</Text>
                            : <ActivityIndicator size='small' />}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(null, { loginUser })(Login);
