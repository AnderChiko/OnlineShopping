import { ErrorData } from 'src/app/shared/core/models/error-data';

export class NotificationModel {
  action: string;
  message: string;
  config?: any;

  constructor(action: string, message: string, errorObject?: ErrorData, config?: any) {
    this.action = action;
    if (message) {
      this.message = message;
    } else {
      this.message = errorObject?.result ? errorObject.result.message : errorObject?.errorMessage;
    }
    this.config = config;
  }
}
