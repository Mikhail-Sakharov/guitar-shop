import {UserRole} from "../types/user-role.enum";

const USER_ROLE_KEY = 'guitar-shop-user-role';

export const getUserRole = (): UserRole => {
  const userRole = localStorage.getItem(USER_ROLE_KEY) as UserRole;
  return userRole ?? UserRole.User;
};

export const saveUserRole = (userRole: UserRole): void => {
  localStorage.setItem(USER_ROLE_KEY, userRole);
};

export const dropUserRole = (): void => {
  localStorage.removeItem(USER_ROLE_KEY);
};
