import {userMiddleware, userReducer} from './user';
import {UserAction, UserComponentState, UserState} from './user/store/types';
import {Reducers} from '../store/types';
import {Header, Main} from './sections';

const middleware = [
  ...userMiddleware
];

type ComponentAction = UserAction;
type ComponentState = UserState;

export type ConnectedState = UserComponentState;

const reducers: Reducers<ComponentState, ComponentAction> = {
  user: userReducer
};

export {
  middleware,
  reducers,
  Header,
  Main
};
