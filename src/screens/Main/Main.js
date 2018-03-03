import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class Main extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'black' }}>Main Page</Text>
            </View>
        );
    }
}
