import { createSelector } from 'reselect';

function getReposFromState(state) {
    return state.repos.repos;
}

export const getRepos = createSelector(
    [ getReposFromState ],
    repos => repos
);
