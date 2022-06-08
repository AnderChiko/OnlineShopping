import { Product } from "./product.model";

export interface IProductListResponse {
  requestMessage?: string;
  isSuccessStatusCode?: boolean;
  responseMessage?: string | undefined;
  responseObject?: Product[] | undefined;

}


export class ProductListResponse implements IProductListResponse {
  requestMessage?: string;
  isSuccessStatusCode?: boolean;
  responseMessage?: string | undefined;
  responseObject?: Product[] | undefined;
}
