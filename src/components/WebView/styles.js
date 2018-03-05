import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

const margin = Platform.OS === 'android' ? StatusBar.currentHeight : 12;

export default StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent'
    },
    container: {
        width: width - margin * 2,
        flexDirection: 'column',
        backgroundColor: 'white',
        margin,
        marginTop: Platform.OS === 'ios' ? 12 : 0
    },
    header: {
        width: width - margin * 2,
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D8D8D8'
    },
    webview: {
        height: height - 64 - margin * 2,
        width: width - margin * 2
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
