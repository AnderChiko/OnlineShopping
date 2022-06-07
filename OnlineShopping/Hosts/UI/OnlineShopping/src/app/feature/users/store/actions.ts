import { createAction, props } from "@ngrx/store";
import { User, UserApiResponse } from "src/app/api/nswag";

export const saveUser = createAction(
  '[User]  Save User',
  props<{ payload: User }>()
);

export const saveUserSuccess = createAction(
  '[User]  Save User Success',
  props<{ payload: UserApiResponse }>()
);

export const saveUserError = createAction(
  '[User]  Save User Failed',
  props<{ payload: UserApiResponse }>()
);
