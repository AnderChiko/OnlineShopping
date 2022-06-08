import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './feature/login/auth.service';
import { LoginService } from './feature/login/login.service';
import { Login } from './feature/login/models/login';
import { CartService } from './feature/orders/cart.service';
import { Order } from './feature/orders/models/order.model';
import { User } from './feature/user/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  user: User;
  order: Order;
  public year = new Date().getFullYear()

  constructor(private routerService: Router
    , public authService: LoginService,
    public cartService: CartService
  ) {
    this.authService.user.subscribe(x => this.user = x);
    this.cartService.currentOrder.subscribe(x => this.order);
  }



  logout() {
    this.authService.logout();
  }

  public GoToUrl(url: string) {

    if (url == 'logout')
      this.authService.logout();
    else
      this.routerService.navigate([url]);
  }

}
