import { Alert } from 'react-native';

export function alert(msg, header) {
    Alert.alert(
        header || '',
        msg || 'Please try to reload application',
        [
            {
                text: 'OK',
                onPress: () => {}
            }
        ],
        { cancelable: false }
    );
}
