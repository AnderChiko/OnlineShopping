import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProcessable } from 'src/app/shared/core/models/processable';
import { IAppState } from 'src/app/app-states';
import { Login, LoginResultApiResponse } from 'src/app/api/nswag';
import { selectLoginResult } from 'src/app/feature/login/store/selectors';
import { loginUser, logoutUser } from 'src/app/feature/users/store/actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginSubscription$$!: Subscription;
  public loginResult$: Observable<IProcessable<LoginResultApiResponse>> =
    this.store.select(selectLoginResult);
  constructor(private store: Store<IAppState>) { }

  public login(login: Login) {
    this.store.dispatch(loginUser({ payload: login }));
  }

  public logout() {
    if (this.loginSubscription$$) {
      this.loginSubscription$$.unsubscribe();
    }

    this.store.dispatch(logoutUser({ message: '' }));
  }
}
