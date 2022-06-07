import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ResetPassword } from 'src/app/api';
import { ComponentBase } from 'src/app/shared/core/base-components/component-base';
import { ConfigService } from 'src/app/shared/core/services/config.service';
import { isUsable } from 'src/app/shared/core/utilities/validations';
import { IAppState } from 'src/app/state';
import { State } from '../../models/state';
import { resetPassword } from '../../store/actions';
import { selectResetPasswordResult } from '../../store/selectors';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends ComponentBase
  implements OnInit, OnDestroy {
  username: string;
  newPassword = '';
  confirmNewPassword = '';
  resetToken = '';
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private configService: ConfigService,
    private store: Store<IAppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public app: AppComponent) { super(); }

  ngOnInit(): void {
    this.addSubcription(this.store.select(selectResetPasswordResult).subscribe(result => {
      if (isUsable(result)) {
        this.isLoading.next(result.isLoading);
      }
    }));

    this.activatedRoute.params.subscribe(params => {
      this.resetToken = params.token;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  resetPassword(): void {
    this.isLoading.next(true);
    const resetPasswordPayload = new ResetPassword();
    resetPasswordPayload.username = this.username;
    resetPasswordPayload.newPassword = this.newPassword;
    resetPasswordPayload.confirmNewPassword = this.confirmNewPassword;
    resetPasswordPayload.resetToken = this.resetToken;
    this.store.dispatch(resetPassword({ payload: resetPasswordPayload }));
  }

  public selectChangeEvent() {
    this.username = null;
  }

  public cancel(){
    this.router.navigate(['login']);
  }
}
