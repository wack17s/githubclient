import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        paddingLeft: 40,
        width: width - 16,
        height: 40
    },
    button: {
        width: 60,
        height: 30,
        borderRadius: 12,
        alignItems: 'center',
        marginLeft: 12,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    buttonLabel: {
        color: 'white'
    }
});
