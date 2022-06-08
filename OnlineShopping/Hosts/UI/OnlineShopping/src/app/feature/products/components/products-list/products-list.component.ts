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

  prodLists: Product[] = [
    { id: 1, name: 'Test product 1', description: 'Test product description 1', dateCreated: null, isActive: true, isDeleted: false, imageUrl: '', price: 12.00 }
    , { id: 2, name: 'Test product 2', description: 'Test product description 2', dateCreated: null, isActive: true, isDeleted: false, imageUrl: '', price: 25.00 }
    , { id: 3, name: 'Test product 3', description: 'Test product description 3', dateCreated: null, isActive: true, isDeleted: false, imageUrl: '', price: 75.00 }
    , { id: 4, name: 'Test product 4', description: 'Test product description 4', dateCreated: null, isActive: true, isDeleted: false, imageUrl: '', price: 100.00 }
  ]

  constructor(private toastr: ToastrService
    , private productService: ProductService
    , private cartService: CartService
  ) {

  }

  ngOnInit() {

    this.loadProducts();

  }

  public loadProducts() {
    this.productList = this.prodLists;
    // this.loading = true;

    this.productService.getProducts().subscribe(
      (response) => {

        if (response == null && !response.isSuccessStatusCode) {
          this.toastr.error(response.responseMessage, "Error");
          this.loading = false;
          return;
        }
        this.loading = false;
        this.productList = response.responseObject;
      },
      error => { },
      () => {

        this.toastr.error("internal server error.", "Error");
        this.loading = false;
        return;

      });
  }

  public addToCart(prod: Product, qty: number) {
    this.cartService.addOrderItem(new OrderItems(prod, qty));
  }
}
