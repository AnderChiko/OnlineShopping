import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './feature/product/components/product-list/product-list.component';
import { ProductDetailComponent } from './feature/product/components/product-detail/product-detail.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app-reducers';
import { UserLoginComponent } from './feature/users/components/user-login/user-login.component';
import { UserRegisterComponent } from './feature/users/components/user-register/user-register.component';
import { AppInputComponent } from './shared/components/app-input/app-input.component';
import { AppButtonComponent } from './shared/components/app-button/app-button.component';
import { AppDropdownComponent } from './shared/components/app-dropdown/app-dropdown.component';
import { AppCheckBoxComponent } from './shared/components/app-check-box/app-check-box.component';
import { AppCheckboxComponent } from './shared/components/app-checkbox/app-checkbox.component';
import { AppCalenderComponent } from './shared/components/app-calender/app-calender.component';
import { AppPasswordComponent } from './shared/components/app-password/app-password.component';
import { AppMultselectComponent } from './shared/components/app-multselect/app-multselect.component';
import { AppRadiobuttonComponent } from './shared/components/app-radiobutton/app-radiobutton.component';
import { AppTableComponent } from './shared/components/app-table/app-table.component';
import { AppMessageComponent } from './shared/components/app-message/app-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AppInputComponent,
    AppButtonComponent,
    AppDropdownComponent,
    AppCheckBoxComponent,
    AppCheckboxComponent,
    AppCalenderComponent,
    AppPasswordComponent,
    AppMultselectComponent,
    AppRadiobuttonComponent,
    AppTableComponent,
    AppMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    //StoreModule.forRoot({ product: addProductReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
