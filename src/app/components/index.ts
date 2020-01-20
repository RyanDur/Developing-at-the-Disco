import {App} from './App';
import {Reducers} from '../../lib/redux/types';
import {UserAction, userMiddleware, userReducers, UserState} from './user';

type ComponentAction = UserAction;
type ComponentState = UserState;

const middleware = [
  ...userMiddleware
];

const reducers: Reducers<ComponentState, ComponentAction> = {
  ...userReducers
};

export {
  middleware,
  reducers,
  ComponentState
};

export default App;
