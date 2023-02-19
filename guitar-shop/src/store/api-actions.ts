import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const';
import {getQueryString, getRandom, getReviewsQueryString} from '../helpers';
import {CommentRequestBody} from '../types/comment-request-body';
import {GetReviewsQueryArguments, QueryArguments} from '../types/common';
import {RegisterUserRequestBody} from '../types/register-user-request-body';
import {ProductDto} from '../types/product.dto';
import {ReviewDto} from '../types/review.dto';
import {AppDispatch, State} from '../types/state';
import UserResponse from '../types/user.response';
import {saveToken} from '../services/token';
import {LoginUserRequestBody} from '../types/login-user-request-body';
import LoggedUserResponse from '../types/logged-user.response';
import {saveUserName} from '../services/user-name';
import {saveUserRole} from '../services/user-role';
import {OrderResponse} from '../types/order.response';
import CreateOrderDto from '../types/create-order.dto';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.CheckAuth);
  },
);

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

export const fetchProductAction = createAsyncThunk<ProductDto, string | undefined, {
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
    return data;
  },
);

export const postCommentAction = createAsyncThunk<ReviewDto, CommentRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async (commentRequestBody, {dispatch, extra: api}) => {
    const transformedReqBody = {
      id: Number(new Date()) * getRandom(0, 5) + getRandom(0, 99),
      createdAt: new Date().toISOString(),
      user: {
        firstName: 'Михаил',
        lastName: 'Сахаров'
      },
      ...commentRequestBody
    };
    const {data} = await api.post<ReviewDto>(APIRoute.Reviews, transformedReqBody);
    return data;
  },
);

export const registerUserAction = createAsyncThunk<UserResponse, RegisterUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async (registerUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api.post<UserResponse>(APIRoute.Register, registerUserRequestBody);
    saveToken(data.token);
    saveUserName(data.userName);
    saveUserRole(data.userRole);
    return data;
  },
);

export const loginUserAction = createAsyncThunk<LoggedUserResponse, LoginUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (loginUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api.post<LoggedUserResponse>(APIRoute.Login, loginUserRequestBody);
    saveToken(data.token);
    saveUserName(data.userName);
    saveUserRole(data.userRole);
    return data;
  },
);

export const postOrderAction = createAsyncThunk<OrderResponse, CreateOrderDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postOrder',
  async (createOrderRequestBody, {dispatch, extra: api}) => {
    const {data} = await api.post<OrderResponse>(APIRoute.Orders, createOrderRequestBody);
    return data;
  },
);

export const fetchOrdersAction = createAsyncThunk<OrderResponse[], QueryArguments, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOrders',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.post<OrderResponse[]>(`${APIRoute.Orders}/${_arg}`);
    return data;
  },
);

/* {
  "id": "63f26557309688cf76e4825b",
  "createdAt": "2023-02-19T18:07:19.853Z",
  "orderNumber": "57-328-322",
  "items": [
    {
      "productId": "63f1103012f60ca02937e575",
      "quantity": 3,
      "totalOrderPrice": 1782420
    },
    {
      "productId": "63f1103012f60ca02937e57f",
      "quantity": 2,
      "totalOrderPrice": 1200358
    }
  ],
  "user": {
    "id": "63f1103012f60ca02937e579",
    "createdAt": "2023-02-18T17:51:44.789Z",
    "email": "asd@asd.asd",
    "userName": "zxvcbn",
    "userRole": "User"
  },
  "totalOrderPrice": 2982778
} */
