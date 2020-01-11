import {createUserMiddleware, getOtherUsersMiddleware} from './middleware';
import * as userReducers from './reducer';

const userMiddleware = [
  createUserMiddleware,
  getOtherUsersMiddleware
];

export {userMiddleware, userReducers};
