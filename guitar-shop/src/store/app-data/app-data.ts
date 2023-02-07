import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductDto} from '../../types/product.dto';
import {fetchProductAction, fetchProductsAction} from '../api-actons';

type InitalState = {
  products: ProductDto[];
  product: ProductDto | null;
}

const initialState: InitalState = {
  products: [],
  product: null,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
      }).addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  }
});
