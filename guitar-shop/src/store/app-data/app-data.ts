import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_PAGE_NUMBER, NameSpace, PRODUCTS_LIMIT} from '../../const';
import {SortType, SortOrder} from '../../types/common';
import {ProductDto} from '../../types/product.dto';
import {ReviewDto} from '../../types/review.dto';
import {fetchReviewsAction, fetchProductAction, fetchProductsAction} from '../api-actons';

type InitalState = {
  dataLoadedStatus: boolean;
  products: ProductDto[];
  productsCount: number;
  activePage: number;
  pagesCount: number;
  sortType: SortType;
  sortOrder: SortOrder;
  minPrice: number;
  maxPrice: number;
  product: ProductDto | null;
  reviews: ReviewDto[];
}

const initialState: InitalState = {
  dataLoadedStatus: false,
  products: [],
  productsCount: 0,
  activePage: DEFAULT_PAGE_NUMBER,
  pagesCount: 0,
  sortType: SortType.Price,
  sortOrder: SortOrder.Asc,
  minPrice: 100,
  maxPrice: 1000000,
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
    },
    changeActivePageAction: (state, action) => {
      state.activePage = action.payload as number;
    },
    setDataLoadedStatus: (state, action) => {
      state.dataLoadedStatus = action.payload as boolean;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        const currentQueryPagesCount = Math.ceil(action.payload[1] / PRODUCTS_LIMIT);
        state.pagesCount = currentQueryPagesCount;
        if (state.activePage > currentQueryPagesCount) {
          state.activePage = currentQueryPagesCount;
        }
        state.products = action.payload[0];
        state.productsCount = action.payload[1];
        state.minPrice = action.payload[2];
        state.maxPrice = action.payload[3];
        state.dataLoadedStatus = false;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.dataLoadedStatus = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.dataLoadedStatus = false;
      });
  }
});

export const {changeSortTypeAction, changeSortOrderAction, changeActivePageAction, setDataLoadedStatus} = appData.actions;
