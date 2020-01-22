import {createUserMiddleware, getOtherUsersMiddleware, logoutMiddleware} from './user/middleware';
import {errors, users} from './user/reducer';

export const userMiddleware = [
  createUserMiddleware,
  getOtherUsersMiddleware,
  logoutMiddleware
];

export const userReducers = {
  users,
  errors
};
