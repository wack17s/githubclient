import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listContainer: {
        width,
        height: height - 80 - 24 - 12
    },
    emptyBlock: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 80 + 24 + 12,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        paddingLeft: 24,
        marginVertical: 8
    },
    text: {
        margin: 6
    },
    line: {
        width: width - 48,
        height: 1,
        backgroundColor: 'grey',
        marginTop: 8
    }
});
