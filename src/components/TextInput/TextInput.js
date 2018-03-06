import React, { PureComponent } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Input extends PureComponent {
    static propTypes = {
        text         : PropTypes.string,
        onChangeText : PropTypes.func.isRequired,
        onSubmit     : PropTypes.func,
        placeholder  : PropTypes.string,
        secure       : PropTypes.bool
    }

    static defaultProps = {
        text: '',
        secure: false,
        placeholder: '',
        onSubmit: () => {}
    }

    render() {
        const { onChangeText, text, onSubmit, placeholder, secure } = this.props;

        return (
            <View style={styles.container}>
                <TextInput
                    editable
                    secureTextEntry = {secure}
                    style           = {styles.input}
                    autoCapitalize  = 'none'
                    onChangeText    = {onChangeText}
                    value           = {text}
                    placeholder     = {placeholder}
                    onSubmitEditing = {onSubmit}
                    underlineColorAndroid = 'transparent'
                    placeholderTextColor  = 'grey'
                />
            </View>
        );
    }
}
