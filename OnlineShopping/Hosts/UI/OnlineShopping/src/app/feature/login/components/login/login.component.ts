import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { AuthService } from '../../auth.service';
import { LoginService } from '../../login.service';
import { Login } from '../../models/login';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  public submitted: boolean = false;
  public loading: boolean = false;
  public result: string = '';

  constructor(private _formBuilder: FormBuilder
    , private toastr: ToastrService
    , public loginService: LoginService
    , public authService: AuthService
    , private routerService: Router
    , private localStorageService: LocalStorageService

  ) {
    this.createForm();
  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.localStorageService.setUserDetails(null);
    localStorage.clear();
    this.createForm();
  }

  get formControls() { return this.loginForm.controls; }

  public createForm() {
    this.loginForm = this._formBuilder.group({
      emailaddress: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy() {
  }


  get f() { return this.loginForm.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;

    this.loading = true;

    let objPost = {
      emailaddress: this.f.emailaddress.value
      , password: this.f.password.value
    }
    this.localStorageService.setUserDetails(objPost);

    this.loginService.login(this.f.emailaddress.value, this.f.password.value).subscribe(
      (response) => {

        //failed
        if (response == null || !response.isSuccessStatusCode) {
          this.authService.failedLogin();
          this.toastr.error(response.requestMessage, "Error");
          this.loading = false;
          return;
        }

        if (response.isSuccessStatusCode) {
          this.toastr.success("Login successful", "Success");
          this.routerService.navigate(['productsLists']);
          return;
        }
      },
      error => { },
      () => {

        this.toastr.error("internal server error.", "Error");
        this.loading = false;
        return;

      })
  }
}
