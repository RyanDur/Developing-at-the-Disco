import {UserAction, userMiddleware, userReducers, UserState} from './user';
import {Components} from './Components';
import {Reducers} from '../store/types';
import {UserComponentState} from './user/store/types';

type ComponentAction = UserAction;
type ComponentState = UserState;
type ConnectedState = UserComponentState;

const middleware = [
  ...userMiddleware
];

const reducers: Reducers<ComponentState, ComponentAction> = {
  ...userReducers
};

export {
  middleware,
  reducers,
  Components,
  ConnectedState
};
