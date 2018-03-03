import { LOGIN_USER_SUCCESS } from '../actions/session';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS: {
            const { user } = action;

            return { ...state, user, isLoggedIn: true };
        }
        default:
            return state;
    }
}
