import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductDto} from '../../types/product.dto';
import {ReviewDto} from '../../types/review.dto';
import {fetchReviewsAction, fetchProductAction, fetchProductsAction} from '../api-actons';

type InitalState = {
  products: ProductDto[];
  productsCount: number;
  product: ProductDto | null;
  reviews: ReviewDto[];
}

const initialState: InitalState = {
  products: [],
  productsCount: 0,
  product: null,
  reviews: []
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        if (typeof(action.payload) === 'number') {
          state.productsCount = action.payload;
        } else {
          state.products = action.payload;
        }
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
