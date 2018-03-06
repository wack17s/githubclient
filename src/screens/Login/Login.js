import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import LIVR from 'livr';
import { connect } from 'react-redux';

import TextInput from '../../components/TextInput';

import { alert } from '../../utils/alert';

import { loginUser } from '../../actions/session';

import styles from './styles';

const validator = new LIVR.Validator({
    username: [ 'required', 'not_empty' ],
    password: [ 'required', 'not_empty' ]
});

class Login extends PureComponent {
    static propTypes = {
        loginUser: PropTypes.func.isRequired
    }

    state = {
        isLoading: false,
        username: '',
        password: ''
    }

    handleSignInPress = () => {
        const { username, password } = this.state;

        if (!validator.validate({ username, password })) {
            alert('Please fill in all fields.', 'Login error');

            return;
        }

        if (!this.requestInProcess) {
            this.requestInProcess = true;

            this.setState({ isLoading: true });

            this.props.loginUser(
                username,
                password,
                () => {
                    this.requestInProcess = false;

                    this.setState({ isLoading: false });
                },
                error => {
                    alert(error, 'Login error');

                    this.setState({ isLoading: false });

                    this.requestInProcess = false;
                }
            );
        }
    }

    handleUsername = username => {
        this.setState({ username });
    }

    handlePassword = password => {
        this.setState({ password });
    }

    render() {
        const { username, password, isLoading } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text>Username: </Text>
                <TextInput
                    text         = {username}
                    onChangeText = {this.handleUsername}
                />
                <Text>Password: </Text>
                <TextInput
                    text         = {password}
                    onChangeText = {this.handlePassword}
                    secure
                />

                <TouchableOpacity onPress={this.handleSignInPress}>
                    <View style={styles.button}>
                        {!isLoading
                            ? <Text style={styles.text}>Log In with GitHub</Text>
                            : <ActivityIndicator size='small' />}
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(null, { loginUser })(Login);
