import { call, all, takeLatest, put } from 'redux-saga/effects';

import config from '../etc/config';

import { webview } from '../utils/modals';

import { getToken } from '../api/session';

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

function *loginUser({ onSucces = () => {}, onError = () => {} }) {
    try {
        const userCode = yield new Promise((res, rej) => {
            webview.open(
                {
                    url: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${config.clintId}`
                },
                code => {
                    res(code);
                },
                () => {
                    rej();
                }
            );
        });

        const response = yield call(getToken, userCode);

        if (!response.error) {
            console.log('loginUser response :', response);

            yield call(saveToAsyncStorage, 'userToken', response.access_token);

            yield put(loginUserSuccess());

            yield call(onSucces);
        } else {
            yield call(onError, response.error);

            console.log('loginUser response error: ', response.error);
        }
    } catch (error) {
        console.log('loginUser saga error: ', error);
    }
}

export default function *watchSession() {
    yield all([
        takeLatest(SESSION_INIT, initSession),
        takeLatest(LOGIN_USER, loginUser)
    ]);
}
