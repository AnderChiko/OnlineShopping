
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NotificationAction } from 'src/app/shared/core/enums/core.enum';
import { logoutUser } from 'src/app/features/login/store/actions';
import { NotificationModel } from 'src/app/shared/core/models/notification.model';
import { NotificationService } from '../services/notification.service';
import { VersionService } from '../services/version.service';
import { authError, displayNotification, routerGo, setApiVersion, setUiVersion } from './actions';
import { MenuService } from 'src/app/features/menu/menu.service';

@Injectable()
export class CoreEffects {
    navigateGo$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerGo),
                tap((action) => {
                    const fullPath = action.path.join('/');
                    if (fullPath.includes('?')) {
                        this.router.navigateByUrl(fullPath, { ...action.extras });
                    } else {
                        this.router.navigate(action.path, { queryParams: action.query, ...action.extras });
                    }
                }
                )
            )
        , { dispatch: false }
    );

    authError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authError),
                switchMap((error) => of(logoutUser({ message: error.message }))),
                tap(() => displayNotification({ notificationProps: new NotificationModel(NotificationAction.info, 'Login session expired') }))
            )
    );

    displayNotification$ = createEffect(
        () => this.actions$.pipe(
            ofType(displayNotification),
            tap(action => {
                (this.notificationService.notificationActions[action.notificationProps.action] ||
                    this.notificationService.notificationActions.default)(action.notificationProps.message);
            }),
        ),
        { dispatch: false }
    );

    apiVersion$ = createEffect(
        () => this.actions$.pipe(
            ofType(setApiVersion),
            tap(action => {
                VersionService.apiVersion = action.apiVersion;
            }),
        ),
        { dispatch: false }
    );

    uiVersion$ = createEffect(
        () => this.actions$.pipe(
            ofType(setUiVersion),
            tap(action => {
                VersionService.uiVersion = action.uiVersion;
            }),
        ),
        { dispatch: false }
    );


    constructor(
        private actions$: Actions,
        private router: Router,
        private notificationService: NotificationService
    ) { }
}
