import { all, call } from 'redux-saga/effects';

import watchSession from './session';
import watchRepos from './repos';

export default function *rootSaga() {
    yield all([
        call(watchSession),
        call(watchRepos)
    ]);
}
