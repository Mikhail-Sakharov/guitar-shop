import {UserRole} from "./user-role.enum";

export default class LoggedUserResponse {
  public email!: string;
  public userName!: string;
  public userRole!: UserRole;
  public token!: string;
}
