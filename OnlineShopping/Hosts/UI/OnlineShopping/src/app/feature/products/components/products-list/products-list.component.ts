import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/feature/login/auth.service';
import { LoginService } from 'src/app/feature/login/login.service';
import { CartService } from 'src/app/feature/orders/cart.service';
import { OrderItems } from 'src/app/feature/orders/models/order-item.model';
import { Order } from 'src/app/feature/orders/models/order.model';
import { User } from 'src/app/feature/user/models/user';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {



  loading: boolean = false;
  public productList: Product[];

  public cssClass: string = 'e-custom-style';
  public page: number = 1;
  public pageSize: number = 5;

  constructor(private _formBuilder: FormBuilder
    , private toastr: ToastrService
    , private productService: ProductService

    , private routerService: Router
    , private localStorageService: LocalStorageService
    , private cartService: CartService
  ) {

  }

  ngOnInit() {
    this.productList = [];

  }

  public loadProducts() {
    this.productList = [];
    this.loading = true;

    this.productService.getProducts().subscribe(
      (response) => {

        if (response == null && !response.isSuccessStatusCode) {
          this.toastr.error(response.responseMessage, "Error");
          this.loading = false;
          return;
        }
        this.loading = false;
        this.productList = response.responseObject;
      });
  }

  public addToCart(prod: Product, qty: number) {
    this.cartService.addOrderItem(new OrderItems(prod.id, prod.price, qty));
  }
}
