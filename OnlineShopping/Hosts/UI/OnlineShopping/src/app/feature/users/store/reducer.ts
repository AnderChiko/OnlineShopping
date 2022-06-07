

import { createReducer, on } from '@ngrx/store';
import { UserApiResponse } from 'src/app/api/nswag';
import { Status } from 'src/app/enums/status';
import { Processable } from 'src/app/shared/core/models/processable';
import { saveUser, saveUserError, saveUserSuccess } from './actions';
import { initialUserState } from './state';

export const userReducers = createReducer(
  initialUserState,
  on(saveUser, (state) => ({
    ...state,
    user: { ... new Processable<UserApiResponse>(undefined) }
  })),
  on(saveUserSuccess, (state, { payload }) =>
  ({
    ...state,
    user: { ... new Processable<UserApiResponse>(payload) }
  })
  ),
  on(saveUserError, (state) => {
    const result = new UserApiResponse();
    return {
      ...state,
      user: {
        ...state.userResult,
        isSaving: false
      },
    };
  }),
);
