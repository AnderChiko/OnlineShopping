import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './feature/login/components/login/login.component';
import { ViewOrderCartComponent } from './feature/orders/components/view-order-cart/view-order-cart.component';
import { ProductsListComponent } from './feature/products/components/products-list/products-list.component';
import { UserRegisterComponent } from './feature/user/components/user-register/user-register.component';


const routes: Routes = [
  { path: '', component: ProductsListComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: UserRegisterComponent },
  { path: 'viewordercart', component: ViewOrderCartComponent },
  { path: '**', component: ProductsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
