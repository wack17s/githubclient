import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        marginTop: 24,
        marginBottom: 12
    },
    input: {
        width: width - 16,
        height: 40,
        paddingLeft: 40,
        color: 'black'
    }
});
