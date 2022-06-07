import { initialProductState, IProductState } from "./feature/product/store/states";

export interface IAppState {
  productState: IProductState;
  loginState: ILoginState;

}

export const initialAppState: IAppState = {
  productState: initialProductState,
  loginState: initialLoginState,

};
