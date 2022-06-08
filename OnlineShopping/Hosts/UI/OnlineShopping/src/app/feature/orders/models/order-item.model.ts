import { Product } from "../../products/models/product.model";

export interface IOrderItems {
  id?: number;
  orderId?: number;
  productId?: number;
  unitPrice?: number;
  quantity?: number;
  vat?: number;
  price?: number;
  product?: Product;
}


export class OrderItems implements IOrderItems {
  id?: number;
  orderId?: number;
  productId?: number;
  unitPrice?: number;
  quantity?: number;
  vat?: number;
  price?: number;
  product?: Product;

  constructor(_product: Product, _quantity?: number) {
    this.productId = _product.id;
    this.product = _product;
    this.unitPrice = _product.price;
    this.quantity = _quantity;
  }

}
