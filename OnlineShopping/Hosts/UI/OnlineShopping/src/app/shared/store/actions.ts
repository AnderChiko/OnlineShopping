/* eslint-disable @typescript-eslint/ban-types */
import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { ErrorData } from 'src/app/shared/core/models/error-data';
import { NotificationModel } from '../models/notification.model';

export interface IErrorAction {
  error: ErrorData;
}

export const displayNotification = createAction(
  '[Notification] Display Notification',
  props<{ notificationProps: NotificationModel }>()
);
