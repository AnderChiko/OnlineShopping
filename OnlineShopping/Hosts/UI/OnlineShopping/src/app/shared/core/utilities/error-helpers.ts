import { ActionCreator } from '@ngrx/store';
import { ErrorData } from 'src/app/shared/core/models/error-data';

export const createErrorAction = (errorAction: ActionCreator, sourceAction: ActionCreator, error: any): any => {
  if (error.status !== 401 && error.status !== 403) {
    return errorAction({ error: new ErrorData(error, sourceAction.type) });
  }
  else {
    return errorAction({ error: new ErrorData('', sourceAction.type) });
  }
};
