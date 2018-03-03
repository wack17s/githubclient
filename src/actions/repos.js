import { createAction } from './utils';

export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';

export const fetchRepos = createAction(FETCH_REPOS, 'onSuccess', 'onError', 'page', 'perPage');
export const fetchReposSuccess = createAction(FETCH_REPOS_SUCCESS, 'repos', 'page');
