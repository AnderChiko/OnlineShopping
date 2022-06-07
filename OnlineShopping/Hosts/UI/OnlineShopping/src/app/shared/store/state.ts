
import { ErrorData } from 'src/app/shared/core/models/error-data';
import { environment } from 'src/environments/environment';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICoreState {
  uiVersion: string;
  apiVersion: string;
  displayNotification: boolean;
  showSideNavigationMenu: boolean;
}

export const initialCoreState: ICoreState = {
  uiVersion: '',
  apiVersion: '',
  displayNotification: false,
  showSideNavigationMenu: false,
};

export interface IErrorState {
  errors: ErrorData[];
  lastError: ErrorData | null;
}

export const initialErrorState: IErrorState = {
  errors: [],
  lastError: null,
};

