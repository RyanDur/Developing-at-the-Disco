import Signup from './Signup';
import Others from './Others';
import Info from './Info';
import {userMiddleware, userReducers} from '../../store';
import {UserAction} from '../../store/user/action/types';
import {UserState} from '../../store/user/types';

export const userMiddlewares = userMiddleware;

export {
  UserAction,
  Signup,
  Info,
  userReducers,
  Others,
  UserState
};
