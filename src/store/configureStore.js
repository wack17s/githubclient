import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducers from '../reducers';
import rootSaga from '../sagas';

export default function (initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers(reducers),
        initialState,
        applyMiddleware(sagaMiddleware, logger)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
