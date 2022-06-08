import { User } from "../../user/models/user";
import { OrderItems } from "./order-item.model";

export interface IOrder {
  id?: number;
  userId?: number;
  dateCreated?: Date;
  oderItems?: OrderItems[] | undefined;
  user: User | undefined;
}

export class Order implements IOrder {
  id?: number;
  userId?: number;
  dateCreated?: Date;
  oderItems?: OrderItems[] | undefined;
  user: User;

  constructor(_userId?: number, _emailaddress?: string) {
    this.userId = _userId;
    this.user.emailaddress = _emailaddress;
  }
}
