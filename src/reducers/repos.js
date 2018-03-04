import { FETCH_REPOS_SUCCESS } from '../actions/repos';

export default function repos(state = { repos: [] }, action) {
    switch (action.type) {
        case FETCH_REPOS_SUCCESS:
            return { ...state, repos: [ ...state.repos, ...action.repos ] };
        default:
            return state;
    }
}
