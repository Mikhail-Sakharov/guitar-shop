import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_PAGE_NUMBER, NameSpace, PRODUCTS_LIMIT} from '../../const';
import {SortType, SortOrder, CartType} from '../../types/common';
import {OrderResponse} from '../../types/order.response';
import {ProductDto} from '../../types/product.dto';
import {ReviewDto} from '../../types/review.dto';
import {fetchReviewsAction, fetchProductAction, fetchProductsAction, postCommentAction, postOrderAction, fetchOrdersAction} from '../api-actions';

type InitalState = {
  dataLoadedStatus: boolean;
  products: ProductDto[];
  productsCount: number;
  activePage: number;
  pagesCount: number;
  orders: OrderResponse[];
  ordersCount: number;
  activeOrdersPage: number;
  ordersPagesCount: number;
  sortType: SortType;
  sortOrder: SortOrder;
  minPrice: number;
  maxPrice: number;
  product: ProductDto | null;
  reviews: ReviewDto[];
  currentQueryReviewsCount: number;
  cart: CartType;
}

const initialState: InitalState = {
  dataLoadedStatus: false,
  products: [],
  productsCount: 0,
  activePage: DEFAULT_PAGE_NUMBER,
  pagesCount: 0,
  orders: [],
  ordersCount: 0,
  activeOrdersPage: DEFAULT_PAGE_NUMBER,
  ordersPagesCount: 0,
  sortType: SortType.Price,
  sortOrder: SortOrder.Asc,
  minPrice: 100,
  maxPrice: 1000000,
  product: null,
  reviews: [],
  currentQueryReviewsCount: 0,
  cart: {
    items: [],
    totalCartPrice: 0
  }
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
    },
    clearCart: (state, action) => {
      state.cart = action.payload;
    },
    putProductToCart: (state, action) => {
      state.cart.items.push({
        product: action.payload as ProductDto,
        quantity: 1,
        totalItemPrice: (action.payload as ProductDto).price
      });
      state.cart.totalCartPrice = state.cart.totalCartPrice + (action.payload as ProductDto).price;
    },
    deleteProductFromCart: (state, action) => {
      const productInTheState = state.cart.items.find((item) => item.product?.id === (action.payload as ProductDto).id);
      if (productInTheState) {
        state.cart.items = state.cart.items.filter((item) => item.product?.id !== (action.payload as ProductDto).id);
        state.cart.totalCartPrice = state.cart.totalCartPrice - productInTheState?.totalItemPrice;
      }
    },
    increaseCartItemQuantity: (state, action) => {
      const stateCartItems = state.cart.items;
      const index = stateCartItems.findIndex((item) => item.product?.id === (action.payload as ProductDto).id);
      const productInTheState = stateCartItems[index];
      if (productInTheState) {
        const updatedItem = {
          product: action.payload as ProductDto,
          quantity: productInTheState.quantity + 1,
          totalItemPrice: productInTheState.totalItemPrice + (action.payload as ProductDto).price
        };
        const filteredItems = stateCartItems.filter((item) => item.product?.id !== (action.payload as ProductDto).id);
        state.cart.items = [
          ...filteredItems.slice(0, index),
          updatedItem,
          ...filteredItems.slice(index)
        ];
        state.cart.totalCartPrice = state.cart.totalCartPrice + (action.payload as ProductDto).price;
      }
    },
    decreaseCartItemQuantity: (state, action) => {
      const stateCartItems = state.cart.items;
      const index = stateCartItems.findIndex((item) => item.product?.id === (action.payload as ProductDto).id);
      const productInTheState = stateCartItems[index];
      if (productInTheState && productInTheState.quantity > 1) {
        const updatedItem = {
          product: action.payload as ProductDto,
          quantity: productInTheState.quantity - 1,
          totalItemPrice: productInTheState.totalItemPrice - (action.payload as ProductDto).price
        };
        const filteredItems = stateCartItems.filter((item) => item.product?.id !== (action.payload as ProductDto).id);
        state.cart.items = [
          ...filteredItems.slice(0, index),
          updatedItem,
          ...filteredItems.slice(index)
        ];
        state.cart.totalCartPrice = state.cart.totalCartPrice - (action.payload as ProductDto).price;
      }
    },
    clearReviews: (state, action) => {
      state.reviews = action.payload as ReviewDto[];
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
        const currentReceivedReviews = action.payload;
        const currentStateReviews = state.reviews;
        const isReceivedReviewsEmpty = action.payload.length === 0;
        const isStateReviewsEmpty = state.reviews.length === 0;
        if (!isReceivedReviewsEmpty && isStateReviewsEmpty) {
          state.reviews = action.payload;
        } else if (!isReceivedReviewsEmpty && currentStateReviews[0].productId !== currentReceivedReviews[0].productId) {
          state.reviews = action.payload;
        } else {
          const currentStateReviewsIds = currentStateReviews.map((review) => review.id);
          const filteredReceivedReviews = currentReceivedReviews.filter((receivedReview) => !currentStateReviewsIds.includes(receivedReview.id));
          state.reviews.push(...filteredReceivedReviews);
        }
        state.currentQueryReviewsCount = action.payload.length;
        state.dataLoadedStatus = false;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        const currentReceivedReviews = [action.payload];
        const currentStateReviews = state.reviews;
        const isReceivedReviewsEmpty = currentReceivedReviews.length === 0;
        const isStateReviewsEmpty = state.reviews.length === 0;
        if (!isReceivedReviewsEmpty && isStateReviewsEmpty) {
          state.reviews = currentReceivedReviews;
        } else if (!isReceivedReviewsEmpty && currentStateReviews[0].productId !== currentReceivedReviews[0].productId) {
          state.reviews = currentReceivedReviews;
        } else {
          const currentStateReviewsIds = currentStateReviews.map((review) => review.id);
          const filteredReceivedReviews = currentReceivedReviews.filter((receivedReview) => !currentStateReviewsIds.includes(receivedReview.id));
          state.reviews.unshift(...filteredReceivedReviews);
        }
        state.currentQueryReviewsCount = currentReceivedReviews.length;
        state.dataLoadedStatus = false;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.dataLoadedStatus = false;
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        const currentQueryPagesCount = Math.ceil(action.payload[1] / PRODUCTS_LIMIT);
        state.ordersPagesCount = currentQueryPagesCount;
        if (state.activeOrdersPage > currentQueryPagesCount) {
          state.activeOrdersPage = currentQueryPagesCount;
        }
        state.orders = action.payload[0];
        state.ordersCount = action.payload[1];
        state.dataLoadedStatus = false;
      });
  }
});

export const {
  changeSortTypeAction,
  changeSortOrderAction,
  changeActivePageAction,
  setDataLoadedStatus,
  clearCart,
  putProductToCart,
  deleteProductFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearReviews
} = appData.actions;
