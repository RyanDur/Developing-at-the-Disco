import {Info, Signup, userMiddleware, userReducer} from './user';
import {UserAction, UserState} from './user/store/types';
import {Reducers} from '../store/types';

const middleware = [
  ...userMiddleware
];

type ComponentAction = UserAction;
type ComponentState = UserState;

const reducers: Reducers<ComponentState, ComponentAction> = {
  user: userReducer
};

export {
  middleware,
  reducers,
  Signup,
  Info
};
