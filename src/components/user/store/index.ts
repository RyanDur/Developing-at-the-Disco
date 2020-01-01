import {userClient} from './data';
import {createUserMiddleware, getOtherUsersMiddleware} from './middleware';
import * as userReducers from './reducer';

const userMiddleware = [
  createUserMiddleware(userClient.create),
  getOtherUsersMiddleware(userClient.getAll)
];

export {userMiddleware, userReducers};
