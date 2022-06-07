import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ForgotPassword } from 'src/app/api';
import { ComponentBase } from 'src/app/shared/core/base-components/component-base';
import { ConfigService } from 'src/app/shared/core/services/config.service';
import { isUsable } from 'src/app/shared/core/utilities/validations';
import { IAppState } from 'src/app/state';
import { State } from '../../models/state';
import { forgotPassword } from '../../store/actions';
import { selectForgotPasswordResult } from '../../store/selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends ComponentBase
  implements OnInit, OnDestroy {
  username: string;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private configService: ConfigService,
    private location: Location,
    private store: Store<IAppState>,
    public app: AppComponent) { super(); }

  ngOnInit(): void {
    this.addSubcription(this.store.select(selectForgotPasswordResult).subscribe(result => {
      if (isUsable(result)) {
        this.isLoading.next(result.isLoading);
      } else {
        this.isLoading.next(false);
      }
    }));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  sendResetLink(): void {
    this.isLoading.next(true);
    const forgotPasswordPayload = new ForgotPassword();
    forgotPasswordPayload.username = this.username;
    this.store.dispatch(forgotPassword({ payload: forgotPasswordPayload }));
  }

  public selectChangeEvent() {
    this.username = null;
  }

  public cancel() {
    this.location.back();
  }
}
