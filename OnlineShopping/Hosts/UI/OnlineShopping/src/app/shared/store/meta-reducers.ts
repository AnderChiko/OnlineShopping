
import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { logoutUser } from 'src/app/features/login/store/actions';
import { initialAppState } from 'src/app/state';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function clearStateMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        if (action != null && (action.type === logoutUser.type)) {
            return reducer({ ...initialAppState, errorState: state.errorState, loginState: { message: (action as any).message } }, action);
        }
        return reducer(state, action);
    };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function coreStateStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(
      {
        keys: [ 'uiVersion', 'apiVersion' ],
        storage: sessionStorage,
        rehydrate: true,
        removeOnUndefined: true }
    )(reducer);
  }
