import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {SortType, SortOrder} from '../../types/common';
import {ProductDto} from '../../types/product.dto';
import {ReviewDto} from '../../types/review.dto';
import {fetchReviewsAction, fetchProductAction, fetchProductsAction} from '../api-actons';

type InitalState = {
  products: ProductDto[];
  productsCount: number;
  sortType: SortType;
  sortOrder: SortOrder;
  product: ProductDto | null;
  reviews: ReviewDto[];
}

const initialState: InitalState = {
  products: [],
  productsCount: 0,
  sortType: SortType.Price,
  sortOrder: SortOrder.Asc,
  product: null,
  reviews: []
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeSortTypeAction: (state, action) => {
      state.sortType = action.payload as SortType;
    },
    changeSortOrderAction: (state, action) => {
      state.sortOrder = action.payload as SortOrder;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => { // разделить действия
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

export const {changeSortTypeAction, changeSortOrderAction} = appData.actions;
