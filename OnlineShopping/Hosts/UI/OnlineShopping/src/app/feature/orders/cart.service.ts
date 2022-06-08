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

  public get userOrderValue(): Order {
    return JSON.parse(this.localStorageService.getCurrentOrder());
  }

  public addOrderItem(item: OrderItems) {

    let thisOrder = JSON.parse(this.localStorageService.getCurrentOrder());
    if (thisOrder == null)
      thisOrder = new Order(this.currentUser);

    //group items
    var objIndex = thisOrder.orderItems.findIndex(x => x.productId == item.product.id);
    if (objIndex >= 0) {
      var itemsCount = thisOrder.orderItems.find(x => x.productId == item.product.id);
      //increament
      thisOrder.orderItems[objIndex].quantity = itemsCount.quantity + item.quantity;
    }
    else
      thisOrder.orderItems.push(item);

    this.localStorageService.setCurrentOrder(thisOrder);
    this.currentOrder = this.currentOrderSubject.asObservable();

  }

  public clearOrder() {
    this.localStorageService.setCurrentOrder(null);
    this.currentOrder = this.currentOrderSubject.asObservable();
  }

  getOrderItemsCount(): number {
    let thisOrder = JSON.parse(this.localStorageService.getCurrentOrder());
    if (thisOrder == null)
      return 0;

    return thisOrder.orderItems.length;
  }

  totalOrderPrice(): number {
    let thisOrder = JSON.parse(this.localStorageService.getCurrentOrder());
    var total = 0;
    for (var i = 0; i < thisOrder.orderItems.length; i++) {
      total += (thisOrder.orderItems[i].quantity * thisOrder.orderItems[i].product.price);
    }

    return total;
  }


}
