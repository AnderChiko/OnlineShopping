import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageService } from "src/app/Shared/services/local-storage.service";
import { LoginService } from "../login/login.service";
import { User } from "../user/models/user";
import { OrderItems } from "./models/order-item.model";
import { Order } from "./models/order.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentUser: User;
  private currentOrderSubject: BehaviorSubject<Order>;
  public currentOrder: Observable<Order>;

  constructor(
    private localStorageService: LocalStorageService
    , private routerService: Router
    , private authService: LoginService

  ) {

    this.currentOrderSubject = new BehaviorSubject<Order>(JSON.parse(this.localStorageService.getCurrentOrder()));
    this.currentOrder = this.currentOrderSubject.asObservable();
    this.authService.user.subscribe(x => this.currentUser = x);
  }

  public addOrderItem(item: OrderItems) {


    let thisOrder = this.localStorageService.getCurrentOrder();
    if (thisOrder)
      thisOrder = new Order(0, this.currentUser.emailaddress);

    thisOrder.orderItem.push(item);
    this.localStorageService.setCurrentOrder(thisOrder);
    this.currentOrder = this.currentOrderSubject.asObservable();

  }

}
