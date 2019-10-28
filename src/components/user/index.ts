import Signup, {reducer as signupReducer} from './Signup';
import Others from './Others';
import Info from './Info';
import {
  userMiddleware,
  userReducer
} from './store';
import {UserStoreAction} from './store/types';
import {SignupAction} from './Signup/actions';
import {SignupState} from './Signup/types';
import {UserStoreState} from './store/types';

const userReducers = {
  users: userReducer,
  signup: signupReducer
};

export type UserAction = UserStoreAction | SignupAction;
export type UserState = SignupState | UserStoreState;

export {
  Signup,
  Info,
  userMiddleware,
  userReducers,
  Others
};
