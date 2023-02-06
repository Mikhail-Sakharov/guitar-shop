import {UserRole} from './user-role.enum';

export class User {
  public _id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public userRole!: UserRole;
}
