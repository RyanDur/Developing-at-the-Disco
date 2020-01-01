import Signup from './Signup';
import Others from './Others';
import Info from './Info';
import {userMiddleware, userReducers} from './store';
import {UserState} from './store/types';
import { UserAction } from './store/action/types';

export const userMiddlewares = userMiddleware;

export {
  UserAction,
  Signup,
  Info,
  userReducers,
  Others,
  UserState
};
