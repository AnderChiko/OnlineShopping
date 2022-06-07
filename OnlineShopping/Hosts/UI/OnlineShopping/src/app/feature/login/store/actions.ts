import { createAction, props } from '@ngrx/store';
import { Login, LoginResultApiResponse } from 'src/app/api/nswag';
import { ErrorData } from 'src/app/shared/core/models/error-data';

export const loginUser = createAction(
  '[Login] User',
  props<{ payload: Login }>()
);

export const loginUserSuccess = createAction(
  '[Login] User Success',
  props<{ payload: LoginResultApiResponse }>()
);

export const loginUserFailed = createAction(
  '[Login] User Failed',
  props<{ payload: LoginResultApiResponse }>()
);

export const loginUserError = createAction(
  '[User] Login User Error',
  props<{ error: ErrorData }>()
);

export const logoutUser = createAction(
  '[User] Logout User',
  props<{ message: string }>()
);
