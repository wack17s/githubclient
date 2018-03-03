import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'black'
    },
    container: {
        width,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    header: {
        width,
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D8D8D8'
    },
    webview: {
        height: height - 64,
        width
    },
    button: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 14
    }
});
