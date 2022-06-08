import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/Shared/services";
import { Order } from "./models/order.model";
import { OrderApiResponse } from "./models/orderApiResponse.model";



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }

  public register(order: Order): Observable<OrderApiResponse> {
    return this.apiService.POST("/api/order/Place", order);
  }

}
