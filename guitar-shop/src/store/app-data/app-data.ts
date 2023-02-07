import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductDto} from '../../types/product.dto';
import {fetchProductsAction} from '../api-actons';

type InitalState = {
  products: ProductDto[];
}

const initialState: InitalState = {
  products: []
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  }
});
