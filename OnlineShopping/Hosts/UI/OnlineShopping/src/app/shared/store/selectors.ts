import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/state';
import { ICoreState } from './state';

const selectCoreState = (state: IAppState) => state.coreState;

export const selectCoreResult = createSelector(
  selectCoreState,
  (state: ICoreState) => state
);

export const selectUiVersion = createSelector(
  selectCoreState,
  (state: ICoreState) => state.uiVersion
);

export const selectApiVersion = createSelector(
  selectCoreState,
  (state: ICoreState) => state.apiVersion
);

export const selectNavigationSideMenuState = createSelector(
  selectCoreState,
  (state: ICoreState) => state.showSideNavigationMenu
);
