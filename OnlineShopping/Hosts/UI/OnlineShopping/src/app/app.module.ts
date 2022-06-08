//angula

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { DatePipe, APP_BASE_HREF, HashLocationStrategy, LocationStrategy, Location, PathLocationStrategy } from '@angular/common'

// 3rd party
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

//components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//seivices
import { UserRegisterComponent } from './feature/user/components/user-register/user-register.component';
import { LoginComponent } from './feature/login/components/login/login.component';
import { AppConfigService } from './Shared/services';
import { ProductsListComponent } from './feature/products/components/products-list/products-list.component';
import { ViewOrderCartComponent } from './feature/orders/components/view-order-cart/view-order-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegisterComponent,
    ProductsListComponent,
    ViewOrderCartComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    NgbModule,
    ModalModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0)',
      fullScreenBackdrop: true,
      primaryColour: '#007bff', //1287fc
      secondaryColour: '#007bff',
      tertiaryColour: '#007bff'
    })
  ],
  providers: [
    DatePipe, Location
    , { provide: LocationStrategy, useClass: PathLocationStrategy }

    , {
      provide: APP_INITIALIZER
      , multi: true
      , deps: [AppConfigService]
      , useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        }
      }
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
