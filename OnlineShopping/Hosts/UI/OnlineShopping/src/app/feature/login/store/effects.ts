import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { iif } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
    forgotPassword, forgotPasswordError, forgotPasswordFailed, forgotPasswordSuccess,
    loginUser, loginUserError, loginUserFailed, loginUserSuccess, logoutUser, resetPassword,
    resetPasswordError, resetPasswordFailed, resetPasswordSuccess
} from './actions';
import { LoginService } from '../login.service';
import { IAppState } from 'src/app/state';
import { LoginResult, LoginResultDataResult, UserDataResult } from 'src/app/api';
import { createErrorAction } from 'src/app/shared/core/utilities/error-helpers';
import { success, VERSION_GENERAL_AVAILABILITY } from 'src/app/constants/app.global.constant';
import { displayNotification } from 'src/app/shared/core/store/actions';
import { NotificationModel } from 'src/app/shared/core/models/notification.model';
import { NotificationAction } from 'src/app/shared/core/enums/core.enum';
import { VersionService } from 'src/app/shared/core/services/version.service';
import { NavService } from 'src/app/shared/core/services/nav.service';
import { ListOptionsProps } from 'src/app/shared/core/models/list-filter-props.model';
import { getGenderListOptions } from '../../code-table/store/gender/actions';
import { getNationalityListOptions } from '../../code-table/store/nationality/actions';
import { getMaritalStatusListOptions } from '../../code-table/store/marital-status/actions';
import { getHomeLanguageListOptions } from '../../code-table/store/home-language/actions';
import { getReligionListOptions } from '../../code-table/store/religion/actions';
import { getEthnicGroupListOptions } from '../../code-table/store/ethnic-group/actions';
import { getCountryListOptions } from '../../code-table/store/country/actions';
import { getRelationshipListOptions } from '../../code-table/store/relationship/actions';
import { getContactTypeListOptions } from '../../code-table/store/contact-type/actions';
import { getProvinceListOptions } from '../../code-table/store/province/actions';
import { getAddressTypeListOptions } from '../../code-table/store/address-type/actions';
import { getPayerListOptions } from '../../code-table/store/payer/actions';
import { getPaymentTypeListOptions } from '../../code-table/store/payment-type/actions';
import { getFacilityTypeListOptions } from '../../code-table/store/facility-type/actions';
import { getMedicalAidListOptions } from '../../code-table/store/medical-aid/actions';
import { getMedicalAidPlanListOptions } from '../../code-table/store/medical-aid-plan/actions';

@Injectable()
export class LoginEffects {
    loginResult = new LoginResultDataResult();
    loginUser$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginUser),
                switchMap((action) =>
                    this.loginService.postLogin(action.payload).pipe(
                        switchMap((response: LoginResultDataResult) => iif(() =>
                            response.entry.status === 'Success',
                            of(loginUserSuccess({ payload: response })),
                            of(loginUserFailed({ payload: response })),
                        )),
                        catchError((error) => of(createErrorAction(loginUserError, loginUser, error)))
                    )
                ),
            )
    );

    loginUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginUserSuccess),
                switchMap((loginResult: any) => {
                    // TODO set to retrieve versions from login result after API login functional
                    this.versionService.setTargetVersions(VERSION_GENERAL_AVAILABILITY,
                        VERSION_GENERAL_AVAILABILITY);
                    // this.versionService.setTargetVersions(loginResult.payload.entry.versionUi,
                    //     loginResult.payload.entry.versionApi);
                    return of(this.navService.navigateToBase());
                }),
                tap(() => {
                    // initialize application wide state values
                    this.store.dispatch(getGenderListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getNationalityListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getMaritalStatusListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getHomeLanguageListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getReligionListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getEthnicGroupListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getCountryListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getRelationshipListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getContactTypeListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getProvinceListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getAddressTypeListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getPayerListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getPaymentTypeListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getFacilityTypeListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getMedicalAidListOptions({ props: new ListOptionsProps() }));
                    this.store.dispatch(getMedicalAidPlanListOptions({ props: new ListOptionsProps() }));
                }),
                map(() => displayNotification({ notificationProps: new NotificationModel(NotificationAction.success, 'Login Success') })),
            ),
    );

    loginUserError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginUserError),
                map((error) => displayNotification({ notificationProps: new NotificationModel(NotificationAction.error, error.error.result.message) }))
            )
    );

    loginUserFailed$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginUserFailed),
                map((action) => displayNotification(
                    { notificationProps: new NotificationModel(NotificationAction.error, action.payload.entry.message) }))
            )
    );

    forgotPassword$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(forgotPassword),
                switchMap((action) =>
                    this.loginService.postForgotPassword(action.payload).pipe(
                        switchMap((response: UserDataResult) => iif(() =>
                            response.status === 'Success',
                            of(forgotPasswordSuccess({ payload: response })),
                            of(forgotPasswordFailed({ payload: response })),
                        )),
                        catchError((error) => of(createErrorAction(forgotPasswordError, forgotPassword, error)))
                    )),
            )
    );

    forgotPasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(forgotPasswordSuccess),
                map(() => displayNotification({
                    notificationProps: new NotificationModel(NotificationAction.success,
                        'Reset password link sent to your email: Please check your inbox and spam folders')
                })),
            ),
    );

    forgotPasswordError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(forgotPasswordError),
                map((error) => displayNotification({ notificationProps: new NotificationModel(NotificationAction.error, error.error.result.message) }))
            )
    );

    forgotPasswordFailed$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(forgotPasswordFailed),
                map((action) => displayNotification(
                    { notificationProps: new NotificationModel(NotificationAction.error, action.payload.message) }))
            )
    );

    resetPassword$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(resetPassword),
                switchMap((action) =>
                    this.loginService.postResetPassword(action.payload).pipe(
                        switchMap((response: UserDataResult) => iif(() =>
                            response.status === 'Success',
                            of(resetPasswordSuccess({ payload: response })),
                            of(resetPasswordFailed({ payload: response })),
                        )),
                        catchError((error) => of(createErrorAction(resetPasswordError, resetPassword, error)))
                    )),
            )
    );

    resetPasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(resetPasswordSuccess),
                switchMap(() => of(this.navService.navigateToLogin())),
                map(() => displayNotification({
                    notificationProps: new NotificationModel(NotificationAction.success,
                        'Password has been successfully reset: please login with your new password')
                })),
            ),
    );

    resetPasswordError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(resetPasswordError),
                map((error) => displayNotification({ notificationProps: new NotificationModel(NotificationAction.error, error.error.result.message) }))
            )
    );

    resetPasswordFailed$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(resetPasswordFailed),
                map((action) => displayNotification(
                    { notificationProps: new NotificationModel(NotificationAction.error, action.payload.message) }))
            )
    );

    logoutUser$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logoutUser),
                switchMap(() => of(this.navService.navigateToLogin())),
                map((action) => displayNotification({ notificationProps: new NotificationModel(NotificationAction.success, 'Logged Out') }))
            )
    );

    constructor(private actions$: Actions,
        private loginService: LoginService,
        private versionService: VersionService,
        private store: Store<IAppState>,
        private navService: NavService) {
        //TODO Placeholder - temp placeholder before implementing PMI DB
        const entry = new LoginResult();
        entry.status = success;
        entry.versionApi = '1.0.0.0';
        entry.versionUi = '1.0.0.0';
        entry.username = 'placeholder username';
        entry.userDisplayName = 'Placeholder Username';
        this.loginResult.entry = entry;
    }
}
