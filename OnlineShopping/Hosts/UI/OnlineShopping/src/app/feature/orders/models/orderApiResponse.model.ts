import { IOrder, Order } from "./order.model";

export interface IOrderApiResponse {
  requestMessage?: string;
  isSuccessStatusCode?: boolean;
  responseMessage?: string | undefined;
  responseObject?: Order;
}


export class OrderApiResponse implements IOrderApiResponse {
  requestMessage?: string;
  isSuccessStatusCode?: boolean;
  responseMessage?: string | undefined;
  responseObject?: Order;
}
