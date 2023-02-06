import {User} from './user.dto';

export class ReviewDto {
  public id!: number;
  public createdAt!: string;
  public user!: User;
  public advantages!: string;
  public disadvantages!: string;
  public text!: string;
  public rating!: number;
}
