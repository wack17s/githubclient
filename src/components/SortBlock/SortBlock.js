import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { capitalize } from '../../utils/common';

import styles from './styles';

export default class SortBlock extends PureComponent {
    static propTypes = {
        choosed  : PropTypes.string,
        onChange : PropTypes.func.isRequired
    }

    static defaultProps = {
        choosed: ''
    }

    handlePress = sortBy => {
        const { onChange, choosed } = this.props;

        const isChoosed = choosed === sortBy;

        if (onChange) onChange(!isChoosed ? sortBy : '');
    }

    renderButton = sortBy => {
        const isChoosed = this.props.choosed === sortBy;

        return (
            <TouchableOpacity onPress={this.handlePress.bind(null, sortBy)}>
                <View style={[ styles.button, isChoosed && { backgroundColor: 'green' } ]}>
                    <Text style={styles.buttonLabel}>{capitalize(sortBy)}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sort by: </Text>
                {this.renderButton('stars')}
                {this.renderButton('forks')}
            </View>
        );
    }
}
