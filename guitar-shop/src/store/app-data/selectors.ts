import {NameSpace} from '../../const';
import {SortType, SortOrder, CartType} from '../../types/common';
import {OrderResponse} from '../../types/order.response';
import {ProductDto} from '../../types/product.dto';
import {ReviewDto} from '../../types/review.dto';
import {State} from '../../types/state';

export const getProducts = (state: State): ProductDto[] => state[NameSpace.Data].products;
export const getMinPrice = (state: State): number => state[NameSpace.Data].minPrice;
export const getMaxPrice = (state: State): number => state[NameSpace.Data].maxPrice;
export const getProduct = (state: State): ProductDto | null => state[NameSpace.Data].product;
export const getReviews = (state: State): ReviewDto[] => state[NameSpace.Data].reviews;
export const getCurrentQueryReviewsCount = (state: State): number => state[NameSpace.Data].currentQueryReviewsCount;
export const getProductsCount = (state: State): number => state[NameSpace.Data].productsCount;

export const getSortType = (state: State): SortType => state[NameSpace.Data].sortType;
export const getSortOrder = (state: State): SortOrder => state[NameSpace.Data].sortOrder;
export const getActivePage = (state: State): number => state[NameSpace.Data].activePage;
export const getPagesCount = (state: State): number => state[NameSpace.Data].pagesCount;

export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].dataLoadedStatus;

export const getCart = (state: State): CartType => state[NameSpace.Data].cart;

export const getOrders = (state: State): OrderResponse[] => state[NameSpace.Data].orders;
export const getOrdersCount = (state: State): number => state[NameSpace.Data].ordersCount;
export const getActiveOrdersPage = (state: State): number => state[NameSpace.Data].activeOrdersPage;
export const getOrdersPagesCount = (state: State): number => state[NameSpace.Data].ordersPagesCount;
