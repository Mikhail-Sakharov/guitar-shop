import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const';
import {getQueryString, getReviewsQueryString} from '../helpers';
import {GetReviewsQueryArguments, QueryArguments} from '../types/common';
import {ProductDto} from '../types/product.dto';
import {ReviewDto} from '../types/review.dto';
import {AppDispatch, State} from '../types/state';

export const fetchProductsAction = createAsyncThunk<[ProductDto[], number, number, number], QueryArguments | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ProductDto[]>(`${APIRoute.Products}${_arg ? getQueryString(_arg) : ''}`);

    // запрос с теми же параметрами, но без лимита и номера страницы для формирования пагинации
    const products = await api.get<ProductDto[]>(
      `${APIRoute.Products}${getQueryString({..._arg, page: undefined, limit: undefined})}`
    );
    const productsCount = products.data.length;

    // поиск мин и макс цены из выборки
    const prices = products.data.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [data, productsCount, minPrice, maxPrice];
  },
);

export const fetchProductAction = createAsyncThunk<ProductDto, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProduct',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ProductDto>(`${APIRoute.Products}/${_arg}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<ReviewDto[], GetReviewsQueryArguments, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewDto[]>(`${APIRoute.Reviews}${getReviewsQueryString(_arg)}`);
    // const comments = await api.get<ReviewDto[]>(`${APIRoute.Reviews}?productId=${_arg.productId}`);
    /* console.log(`Всего: ${comments.data.length}`);
    console.log(`За один запрос: ${data.length}`);
    console.log(`Номер страницы: ${_arg.page ? _arg.page : 'не определено'}`); */
    return data;
  },
);
