import { FETCH_REPOS_SUCCESS, FETCH_REPOS_EMPTY } from '../actions/repos';

export default function repos(state = { repos: [] }, action) {
    switch (action.type) {
        case FETCH_REPOS_SUCCESS:
            return { ...state, repos: action.page === 1 ? action.repos : [ ...state.repos, ...action.repos ] };
        case FETCH_REPOS_EMPTY:
            return { ...state, repos: [] };
        default:
            return state;
    }
}
