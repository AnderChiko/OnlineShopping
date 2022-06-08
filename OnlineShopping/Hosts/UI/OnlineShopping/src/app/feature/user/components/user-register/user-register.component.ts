import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/Shared/custom-validators';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { User } from '../../models/user';
import { UserRegisterResponse } from '../../models/user-register-response';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent implements OnInit, OnDestroy {

  UserRegisterForm: FormGroup;

  //public loginResponse: UserRegisterResponse;
  public submitted: boolean = false;
  public loading: boolean = false;
  public result: string = '';

  constructor(private _formBuilder: FormBuilder
    , private toastr: ToastrService
    , public userService: UserService
    , private routerService: Router
    , private localStorageService: LocalStorageService

  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  get formControls() { return this.UserRegisterForm.controls; }

  public createForm() {
    this.UserRegisterForm = this._formBuilder.group({
      emailaddress: ['', Validators.required],
      password: ['', Validators.required, MustMatch],
      confirmPassword: ['', Validators.required, MustMatch],
    })
  }

  ngOnDestroy() {
  }

  get f() { return this.UserRegisterForm.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.UserRegisterForm.invalid)
      return;

    this.loading = true;

    let objPost = new User(this.f.emailaddress.value, this.f.password.value);

    this.userService.register(objPost).subscribe(
      (response) => {

        //failed
        if (response == null || !response.isSuccessStatusCode) {

          this.toastr.error(response.responseMessage, "Error");
          this.loading = false;
          return;
        }

        if (response.isSuccessStatusCode) {
          this.toastr.success("User successful registered", "Success");
          this.routerService.navigate(['login']);
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
