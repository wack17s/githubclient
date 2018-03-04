import React, { PureComponent } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const PLACEHOLDER = 'Start typing to find a repository..';

export default class SearchInput extends PureComponent {
    static propTypes = {
        text         : PropTypes.string,
        onChangeText : PropTypes.func.isRequired,
        onSubmit     : PropTypes.func
    }

    static defaultProps = {
        text: '',
        onSubmit: () => {}
    }

    render() {
        const { onChangeText, text, onSubmit } = this.props;

        return (
            <View style={styles.container}>
                <TextInput
                    editable
                    style           = {styles.input}
                    autoCapitalize  = 'none'
                    onChangeText    = {onChangeText}
                    value           = {text}
                    placeholder     = {PLACEHOLDER}
                    onSubmitEditing = {onSubmit}
                    underlineColorAndroid = 'transparent'
                    placeholderTextColor  = 'grey'
                />
            </View>
        );
    }
}
