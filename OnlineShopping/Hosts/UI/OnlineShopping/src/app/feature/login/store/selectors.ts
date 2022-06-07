import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/state';
import { ILoginState } from './state';

const selectLoginState = (state: IAppState) => state.loginState;

export const selectLoginResult = createSelector(
    selectLoginState,
    (state: ILoginState) => state.loginResult
);

export const selectForgotPasswordResult = createSelector(
    selectLoginState,
    (state: ILoginState) => state.forgotPasswordResult
);

export const selectResetPasswordResult = createSelector(
    selectLoginState,
    (state: ILoginState) => state.resetPasswordResult
);

