import { call, all, takeLatest, put } from 'redux-saga/effects';

import config from '../etc/config';

import { webview } from '../utils/modals';

import { getToken } from '../api';

// eslint-disable-next-line
import { getFromAsyncStorage, saveToAsyncStorage, clearAsyncStorage } from '../utils/asyncStorage';

import { LOGIN_USER, SESSION_INIT, loginUserSuccess } from '../actions/session';

function *initSession({ onSucces = () => {}, onError = () => {} }) {
    try {
        yield call(clearAsyncStorage, 'user');
        const user = yield call(getFromAsyncStorage, 'user');

        if (user) {
            yield put(loginUserSuccess(user.user));
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

        if (!response.errors) {
            console.log('loginUser response :', response);

            yield call(saveToAsyncStorage, 'user', response);

            yield put(loginUserSuccess(response.user));

            yield call(onSucces);
        } else {
            yield call(onError, response.errors);

            console.log('loginUser response errors: ', response.errors);
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
