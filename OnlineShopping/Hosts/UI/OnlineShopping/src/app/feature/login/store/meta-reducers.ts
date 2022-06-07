import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function loginStateStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(
      {
        keys: [ 'loginResult' ],
        storage: sessionStorage,
        rehydrate: true,
        removeOnUndefined: true }
    )(reducer);
  }
