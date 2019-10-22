import {userClient} from './data';
import {createUserMiddleware, getOtherUsersMiddleware} from './middleware';
import reducer from './reducer';

const userMiddleware = [
  createUserMiddleware(userClient.create),
  getOtherUsersMiddleware(userClient.getAll)
];
const userReducer = reducer;

export {userMiddleware, userReducer};
