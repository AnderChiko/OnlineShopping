import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './feature/product/components/product-list/product-list.component';
import { UserLoginComponent } from './feature/users/components/user-login/user-login.component';
import { UserRegisterComponent } from './feature/users/components/user-register/user-register.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: ProductListComponent
    },
    {
      path: 'products',
      component: ProductListComponent,
      children: [
        {
          path: '',
          component: ProductListComponent
        },
      ]
    },
    {
      path: 'login',
      component: UserLoginComponent,
      children: [
        {
          path: '',
          component: UserLoginComponent
        },
      ]
    },
    {
      path: 'register',
      component: UserRegisterComponent,
      children: [
        {
          path: '',
          component: UserRegisterComponent
        },
      ]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
