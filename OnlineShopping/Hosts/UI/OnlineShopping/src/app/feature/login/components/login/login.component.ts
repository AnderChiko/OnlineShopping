import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ILoginResultDataResult, Login } from 'src/app/api';
import { ComponentBase } from 'src/app/shared/core/base-components/component-base';
import { IProcessable } from 'src/app/shared/core/models/processable';
import { AuthService } from 'src/app/shared/core/services/auth.service';
import { ConfigService } from 'src/app/shared/core/services/config.service';
import { isUsable } from 'src/app/shared/core/utilities/validations';
import { State } from '../../models/state';
import { selectLoginResult } from '../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class LoginComponent extends ComponentBase
  implements OnInit, OnDestroy {
  username: string;
  password: string;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private configService: ConfigService,
    private store: Store,
    private router: Router,
    private authService: AuthService,
    public app: AppComponent) { super(); }

  ngOnInit(): void {
    this.addLoginResultSubscription();
  }

  ngOnDestroy(): void{
    this.unsubscribeAll();
  }

  login(): void{
    const user = new Login();
    user.userName = this.username;
    user.password = this.password;

    this.authService.login(user);
  }

  public selectChangeEvent(){
    this.username = null;
    this.password = null;
  }

  public forgotPasswordNav(){
    this.router.navigate(['forgot-password']);
  }

  private addLoginResultSubscription() {
    this.authService.loginSubscription$$ = this.store.pipe(select(selectLoginResult),
      filter(data => isUsable(data)))
      .subscribe((loginResult: IProcessable<ILoginResultDataResult>) => {
        if (loginResult.isLoading) { this.isLoading.next(true); }
        else { this.isLoading.next(false); }
      });
  }
}
