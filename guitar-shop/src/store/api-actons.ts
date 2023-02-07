import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const';
import {ProductDto} from '../types/product.dto';
import {AppDispatch, State} from '../types/state';

export const fetchProductsAction = createAsyncThunk<ProductDto[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ProductDto[]>(APIRoute.Products);
    return data;
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