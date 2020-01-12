import {Components} from './Components';
import {Reducers} from '../../lib/redux/types';
import {UserAction, userMiddlewares, userReducers, UserState} from './user';

type ComponentAction = UserAction;
type ComponentState = UserState;

const middleware = [
  ...userMiddlewares
];

const reducers: Reducers<ComponentState, ComponentAction> = {
  ...userReducers
};

export {
  middleware,
  reducers,
  ComponentState
};

export default Components;
