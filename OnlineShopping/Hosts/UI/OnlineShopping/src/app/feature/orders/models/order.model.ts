import { User } from "../../user/models/user";
import { OrderItems } from "./order-item.model";

export interface IOrder {
  id?: number;
  userId?: number;
  dateCreated?: Date;
  orderItems?: OrderItems[] | undefined;
  user?: User | undefined;
}

export class Order implements IOrder {
  id?: number;
  userId?: number;
  orderItems?: OrderItems[] | undefined;
  user?: User;

  constructor(user?: User) {
    this.user = user;
    this.orderItems = [];
    this.id = 0;
    this.userId = 0;

  }
}
