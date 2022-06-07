import { Status } from "src/app/enums/status";
import { Product } from "./product.model";

export interface IProductsResultList {
  total: number | null;
  entry: Product[] | null;
  currentPage: number | null;
  count: number | null;
  status: Status | null;
  message: string | null;
  transactionId: string | null;
  statusCode: string | null;
}
