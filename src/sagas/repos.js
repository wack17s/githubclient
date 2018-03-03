import { all, put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_REPOS, fetchReposSuccess } from '../actions/repos';

function reposSaga(type) {
    return function* generator({ onSuccess = () => {}, onError = () => {}, page, perPage }) {
        try {
            const response = [ perPage ];

            if (!response.length) onError('empty');

            if (!response.errors) {
                console.log(`Fetch ${type} Repos response: `, response);

                yield call(onSuccess);
                yield put(fetchReposSuccess(response, page));
            } else {
                console.log(`Fetch ${type} Repos response error: `, response.errors);

                yield call(onError, response.errors);
            }
        } catch (error) {
            console.log(`Fetch ${type} Repos saga error: `, error);
        }
    };
}

export default function *watchRepos() {
    yield all([
        takeLatest(FETCH_REPOS, reposSaga)
    ]);
}
