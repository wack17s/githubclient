import { createAction } from './utils';

export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_EMPTY = 'FETCH_REPOS_EMPTY';

export const fetchRepos = createAction(FETCH_REPOS, 'query', 'sort', 'onSuccess',
    'onError', 'page', 'perPage', 'isConnected');
export const fetchReposSuccess = createAction(FETCH_REPOS_SUCCESS, 'repos', 'page');
export const fetchReposEmpty = createAction(FETCH_REPOS_EMPTY);
