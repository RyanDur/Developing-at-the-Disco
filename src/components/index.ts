import {UserAction, userMiddleware, userReducers, UserState} from './user';
import {UserComponentState} from './user/store/types';
import {Reducers} from '../store/types';
import {Header, Main} from './sections';

const middleware = [
  ...userMiddleware
];

type ComponentAction = UserAction;
type ComponentState = UserState;

export type ConnectedState = UserComponentState;

const reducers: Reducers<ComponentState, ComponentAction> = userReducers;

export {
  middleware,
  reducers,
  Header,
  Main
};
