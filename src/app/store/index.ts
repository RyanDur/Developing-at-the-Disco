import {createUserMiddleware, getOtherUsersMiddleware, logoutMiddleware} from './user/middleware';
import {pages, userErrors, users} from './user/reducer';

export const userMiddleware = [
  createUserMiddleware,
  getOtherUsersMiddleware,
  logoutMiddleware
];

export const userReducers = {
  users,
  userErrors,
  pages
};
