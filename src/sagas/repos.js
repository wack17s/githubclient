import { all, put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_REPOS, fetchReposSuccess, fetchReposEmpty } from '../actions/repos';

import { fetchRepos } from '../api/repos';

import { getFromAsyncStorage, saveToAsyncStorage } from '../utils/asyncStorage';

function* reposSaga({ query, sort, onSuccess = () => {}, onError = () => {}, page, perPage, isConnected }) {
    try {
        let response;

        if (!isConnected) {
            response = yield call(getFromAsyncStorage, 'lastRepos');
        } else {
            response = yield call(fetchRepos, { query, sort, perPage, page });
        }

        response = response || [];

        if (!response.error) {
            console.log('Fetch Repos response: ', response);

            if (!response.length) {
                onError('empty');

                yield put(fetchReposEmpty());

                return;
            }

            if (isConnected) yield call(saveToAsyncStorage, 'lastRepos', response);

            yield call(onSuccess);
            yield put(fetchReposSuccess(response, page));
        } else {
            console.log('Fetch Repos response error: ', response.error);

            yield call(onError, response.error);
        }
    } catch (error) {
        console.log('Fetch Repos saga error: ', error);
    }
}

export default function *watchRepos() {
    yield all([
        takeLatest(FETCH_REPOS, reposSaga)
    ]);
}
