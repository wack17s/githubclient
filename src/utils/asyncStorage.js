import { AsyncStorage } from 'react-native';

export async function saveToAsyncStorage(key, data) {
    try {
        const dataJSON = JSON.stringify(data);

        await AsyncStorage.setItem(key, dataJSON);

        console.log(`${key} was successfuly saved to async storage.`);
    } catch (err) {
        console.log(`${key} saving to async storage error: `, err);
    }
}

export async function getFromAsyncStorage(key) {
    try {
        const savedDataJSON = await AsyncStorage.getItem(key);

        console.log(`${key} was successfuly getted from async storage.`);

        return JSON.parse(savedDataJSON);
    } catch (err) {
        console.log(`${key} getting from async storage error: `, err);
    }
}

export async function clearAsyncStorage() {
    try {
        await AsyncStorage.clear();

        console.log('Async storage was successfuly cleared.');
    } catch (err) {
        console.log('Clearing async storage error: ', err);
    }
}

export async function removeFromAsyncStorage(key) {
    try {
        await AsyncStorage.removeItem(key);

        console.log(`${key} was successfuly removed from async storage.`);
    } catch (err) {
        console.log(`${key} removing from async storage error: `, err);
    }
}
