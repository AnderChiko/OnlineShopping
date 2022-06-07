

import { createReducer, on } from '@ngrx/store';
import { IProductListApiResponse } from 'src/app/api/nswag';
import { Processable } from 'src/app/shared/core/models/processable';

import { getProducts, getProductsError, getProductsSuccess } from './actions';
import { initialProductState } from './states';

const newLocal = null;
//export const ADD_PRODUCT = 'ADD_PRODUCT';

export const productReducers = createReducer(
  initialProductState,
  on(getProducts, (state, action) => ({
    ...state,
    products: { ... new Processable<IProductListApiResponse>(null) },
    productFilter: { ...action }
  })),
  on(getProductsSuccess, (state, { payload }) => ({
    ...state,
    products: { ... new Processable<IProductListApiResponse>(payload) }
  })),
  on(getProductsError, (state) => ({
    ...state,
    products: { ...state.products, isLoading: false, data: null }
  })),
);

