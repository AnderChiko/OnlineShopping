import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "./app-states";
import { productReducers } from "./feature/product/store/reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  productState: productReducers
};
