export interface IOrderItems {
  id?: number;
  orderId?: number;
  productId?: number;
  unitPrice?: number;
  quantity?: number;
  vat?: number;
  price?: number;
}


export class OrderItems implements IOrderItems {
  id?: number;
  orderId?: number;
  productId?: number;
  unitPrice?: number;
  quantity?: number;
  vat?: number;
  price?: number;

  constructor(productId: number, unitPrice: number, quantity: number) {
    productId = productId;
    unitPrice = unitPrice;
    quantity = quantity;
  }

}
