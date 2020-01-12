import * as userReducers from './user/reducer';
import {createUserMiddleware, getOtherUsersMiddleware} from './user/middleware';

const userMiddleware = [
  createUserMiddleware,
  getOtherUsersMiddleware
];

export {userMiddleware, userReducers};
