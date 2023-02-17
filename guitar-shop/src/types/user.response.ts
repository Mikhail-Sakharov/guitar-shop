import {UserRole} from "./user-role.enum";

export default class UserResponse {
  public id!: string;
  public createdAt!: string;
  public email!: string;
  public userName!: string;
  public userRole!: UserRole;
  public token!: string;
}
