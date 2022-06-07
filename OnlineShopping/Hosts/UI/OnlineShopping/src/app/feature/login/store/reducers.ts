import { createReducer, on } from '@ngrx/store';
import { LoginResultDataResult, UserDataResult } from 'src/app/api';
import { Processable } from 'src/app/shared/core/models/processable';
import { forgotPassword, forgotPasswordError, forgotPasswordFailed, forgotPasswordSuccess,
    loginUser, loginUserError, loginUserFailed, loginUserSuccess,
    resetPassword, resetPasswordError, resetPasswordFailed, resetPasswordSuccess } from './actions';
import { initialLoginState } from './state';

export const loginReducers = createReducer(
    initialLoginState,
    on(loginUser, (state) => ({
        ...state,
        loginResult: new Processable<LoginResultDataResult>(null)
    })),
    on(loginUserSuccess, (state, { payload }) => ({
        ...state,
        loginResult: new Processable<LoginResultDataResult>(payload)
    })),
    on(loginUserFailed, (state, { payload }) => ({
        ...state,
        loginResult: new Processable<LoginResultDataResult>(payload)
    })),
    on(loginUserError, (state) => ({
        ...state,
        loginResult: { ... new Processable<LoginResultDataResult>(undefined) }
    })),
    on(forgotPassword, (state) => ({
        ...state,
        forgotPasswordResult: new Processable<UserDataResult>(null)
    })),
    on(forgotPasswordSuccess, (state, { payload }) => ({
        ...state,
        forgotPasswordResult: new Processable<UserDataResult>(payload)
    })),
    on(forgotPasswordFailed, (state, { payload }) => ({
        ...state,
        forgotPasswordResult: new Processable<UserDataResult>(payload)
    })),
    on(forgotPasswordError, (state) => ({
        ...state,
        forgotPasswordResult: { ... new Processable<UserDataResult>(undefined) }
    })),
    on(resetPassword, (state) => ({
        ...state,
        resetPasswordResult: new Processable<UserDataResult>(null)
    })),
    on(resetPasswordSuccess, (state, { payload }) => ({
        ...state,
        resetPasswordResult: new Processable<UserDataResult>(payload)
    })),
    on(resetPasswordFailed, (state, { payload }) => ({
        ...state,
        resetPasswordResult: new Processable<UserDataResult>(payload)
    })),
    on(resetPasswordError, (state) => ({
        ...state,
        resetPasswordResult: { ... new Processable<UserDataResult>(undefined) }
    })),
);
