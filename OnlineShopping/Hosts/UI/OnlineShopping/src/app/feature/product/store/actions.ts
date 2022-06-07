import { createAction, props } from "@ngrx/store";
import { IProductListApiResponse } from "src/app/api/nswag";
import { ErrorData } from "src/app/shared/core/models/error-data";
import { ListProps } from "src/app/shared/core/models/list-filter-props.model";
import { ProductFilter } from "../models/products-filter.model";




export const getProducts = createAction(
  '[Products] Get Products'
);

export const getProductsSuccess = createAction(
  '[Products] Get Products Success',
  props<{ payload: IProductListApiResponse }>()
);

export const getProductsError = createAction(
  '[Products] Get Products Error',
  props<{ error: ErrorData }>()
);
