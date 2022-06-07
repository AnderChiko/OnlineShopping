import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserApiResponse } from 'src/app/api/nswag';
import { NotificationAction } from 'src/app/enums/notification-action';
import { createErrorAction } from 'src/app/shared/core/utilities/error-helpers';
import { NotificationModel } from 'src/app/shared/models/notification.model';
import { displayNotification } from 'src/app/shared/store/actions';
import { UserService } from '../user.service';
import { saveUser, saveUserError, saveUserSuccess } from './actions';

@Injectable()
export class UserEffects {

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveUser),
        switchMap(action =>
          this.userService.registerUser(action.payload).pipe(
            switchMap((response: UserApiResponse) =>
              of(saveUsesrSuccess({ payload: response }))),
            catchError((error) => of(createErrorAction(saveUserError, saveUser, error)))
          ))
      )
  );

  saveUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveUserSuccess),
        map(() => displayNotification({ notificationProps: new NotificationModel(NotificationAction.success, 'Save Success') })),
        tap(() => this.location.back())
      ),
  );

  saveUserError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveUserError),
        map((error) => displayNotification({ notificationProps: new NotificationModel(NotificationAction.error, '', error?.status) }))),
  );

  constructor(private actions$: Actions,
    private userService: UserService,
    private location: Location) { }
}


