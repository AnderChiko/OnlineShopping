import { Product } from "../models/product.model";

export interface IProductState {
  products: any;
  product: Product[];
}

export const initialProductState: IProductState = {
  product: [],
  products: undefined
};
