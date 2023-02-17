const USER_NAME_KEY = 'guitar-shop-user-name';

export type UserName = string;

export const getUserName = (): UserName => {
  const token = localStorage.getItem(USER_NAME_KEY);
  return token ?? '';
};

export const saveUserName = (userName: UserName): void => {
  localStorage.setItem(USER_NAME_KEY, userName);
};

export const dropUserName = (): void => {
  localStorage.removeItem(USER_NAME_KEY);
};
