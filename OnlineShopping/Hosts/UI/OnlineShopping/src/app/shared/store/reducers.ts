import { createReducer, on } from '@ngrx/store';
import { displayNotification, hideSideNavigationMenu, setApiVersion, setUiVersion, showSideNavigationMenu } from './actions';
import { IErrorState, initialCoreState, initialErrorState } from './state';

export const coreReducers = createReducer(
  initialCoreState,
  on(setApiVersion, (state, { apiVersion }) => ({
    ...state,
    apiVersion,
  })),
  on(setUiVersion, (state, { uiVersion }) => ({
    ...state,
    uiVersion,
  })),
  on(displayNotification, (state, notificationProps) => ({
    ...state,
    notificationProps,
    display: true,
  })),
  on(showSideNavigationMenu, (state) => ({
    ...state,
    showSideNavigationMenu: true,
  })),
  on(hideSideNavigationMenu, (state) => ({
    ...state,
    showSideNavigationMenu: false,
  }))
);

//TODO: move into seperate model, replace result with nswag result built in api layer
export interface IErrorAction {
  error: ErrorData;
}

export class ErrorData {
  errorMessage: string;
  errorObject: any;
  result: Result;
  action: string;

  constructor(errorObject: any, action: string) {
    this.errorMessage = errorObject.toString();
    this.errorObject = errorObject;
    this.action = action;

    if (errorObject && errorObject.response) {
      if (errorObject.response.includes('transactionId')) {
        this.result = JSON.parse(errorObject.response);
        if (this.result.message === '') {
          this.result.message = this.errorMessage;
        }
      }
    } else {
      this.result = new Result();
      this.result.message = this.errorMessage;
    }
  }
}

export class Result {
  status!: string | null;
  message!: string | null;
  transactionId!: string | null;
  statusCode!: string | null;
}

export const errorReducer = (
  state = initialErrorState,
  action: IErrorAction
): IErrorState => {
  if (isErrorAction(action)) {
    // Keep only last 5 errors.
    let errors = [...state.errors, action.error];
    errors = errors.slice(Math.max(errors.length - 5, 0));
    return {
      ...state,
      errors,
      lastError: action.error,
    };
  }

  return state;
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function isErrorAction(arg: any): arg is IErrorAction {
  return arg && arg.error && typeof arg.error === 'object';
}
