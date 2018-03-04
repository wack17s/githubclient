import { all, put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_REPOS, fetchReposSuccess } from '../actions/repos';

import { fetchRepos } from '../api/repos';

function* reposSaga({ query, sort, onSuccess = () => {}, onError = () => {}, page, perPage }) {
    try {
        const response = yield call(fetchRepos, { query, sort, perPage, page });

        if (!response.error) {
            console.log('Fetch Repos response: ', response);

            if (!response.length) {
                onError('empty');

                return;
            }

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
