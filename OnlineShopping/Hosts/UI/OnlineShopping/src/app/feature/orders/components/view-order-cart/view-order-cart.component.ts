import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/feature/products/models/product.model';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { CartService } from '../../cart.service';
import { OrderItems } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-view-order-cart',
  templateUrl: './view-order-cart.component.html'
})
export class ViewOrderCartComponent implements OnInit {


  loading: boolean = false;
  public submitted: boolean = false;
  public userOrder: Order;

  public cssClass: string = 'e-custom-style';
  public page: number = 1;
  public pageSize: number = 5;

  constructor(private _formBuilder: FormBuilder
    , private toastr: ToastrService
    , private routerService: Router
    , private localStorageService: LocalStorageService
    , public cartService: CartService
    , private orderService: OrderService
  ) {

    this.cartService.currentOrder.subscribe(x => this.userOrder);
  }

  ngOnInit() {

    this.userOrder = this.cartService.userOrderValue;

  }



  public placeOrder() {

    this.submitted = true;
    this.loading = true;

    console.log('this.userOrder', this.userOrder)

    this.orderService.placeOrder(this.userOrder).subscribe(
      (response) => {

        //failed
        if (response == null || !response.isSuccessStatusCode) {

          this.toastr.error(response.responseMessage, "Error");
          this.loading = false;
          return;
        }

        if (response.isSuccessStatusCode) {
          this.toastr.success("User successful registered", "Success");
          this.cartService.clearOrder();
          this.routerService.navigate(['home']);
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

