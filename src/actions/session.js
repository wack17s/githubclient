import { createAction } from './utils';

export const SESSION_INIT = 'SESSION_INIT';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const initSession = createAction(SESSION_INIT, 'onSucces', 'onError');
export const loginUser = createAction(LOGIN_USER, 'onSucces', 'onError');
export const loginUserSuccess = createAction(LOGIN_USER_SUCCESS, 'user');
