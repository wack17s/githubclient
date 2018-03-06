import { call, all, takeLatest, put } from 'redux-saga/effects';

import { login } from '../api/session';

// eslint-disable-next-line
import { getFromAsyncStorage, saveToAsyncStorage, clearAsyncStorage } from '../utils/asyncStorage';

import { LOGIN_USER, SESSION_INIT, loginUserSuccess } from '../actions/session';

function *initSession({ onSucces = () => {}, onError = () => {} }) {
    try {
        // yield call(clearAsyncStorage, 'userToken');
        const userToken = yield call(getFromAsyncStorage, 'userToken');

        if (userToken) {
            yield put(loginUserSuccess());
        }

        yield call(onSucces);
    } catch (error) {
        yield call(onError);

        console.log('initSession saga error: ', error);
    }
}

function *loginUser({ username, password, onSucces = () => {}, onError = () => {} }) {
    try {
        const response = yield call(login, username, password);
        const error = response.error || response.message;

        if (!error) {
            console.log('loginUser response :', response);

            yield call(saveToAsyncStorage, 'userToken', response.token);

            yield put(loginUserSuccess());

            yield call(onSucces);
        } else {
            yield call(onError, error);

            console.log('loginUser response error: ', error);
        }
    } catch (error) {
        yield call(onError, error);
        console.log('loginUser saga error: ', error);
    }
}

export default function *watchSession() {
    yield all([
        takeLatest(SESSION_INIT, initSession),
        takeLatest(LOGIN_USER, loginUser)
    ]);
}
