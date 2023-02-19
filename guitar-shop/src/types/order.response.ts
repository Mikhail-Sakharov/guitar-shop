import {CartItemType} from './common';
import UserResponse from './user.response';

export class OrderResponse {
  public id!: number;
  public createdAt!: string;
  public orderNumber!: string;
  public items!: CartItemType[];
  public user!: UserResponse;
  public totalOrderPrice!: number;
}
