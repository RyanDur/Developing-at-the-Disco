import * as userReducers from './user/reducer';
import {createUserMiddleware, getOtherUsersMiddleware, logoutMiddleware} from './user/middleware';

const userMiddleware = [
  createUserMiddleware,
  getOtherUsersMiddleware,
  logoutMiddleware
];

export {userMiddleware, userReducers};
