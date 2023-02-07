import {UserDto} from './user.dto';

export class ReviewDto {
  public id!: number;
  public createdAt!: string;
  public user!: UserDto;
  public productId!: number;
  public advantages!: string;
  public disadvantages!: string;
  public text!: string;
  public rating!: number;
}
