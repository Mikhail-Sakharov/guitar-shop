import {UserRole} from './user-role.enum';

export class UserDto {
  public id?: string;
  public userName!: string;
  public email!: string;
  public userRole!: UserRole;
}
