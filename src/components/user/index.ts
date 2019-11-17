import Signup, {reducer as signupReducer} from './Signup';
import Others from './Others';
import Info from './Info';
import {userMiddleware, userReducer} from './store';
import {UserStoreAction, UserStoreState} from './store/types';
import {SignupAction} from './Signup/actions';
import {SignupState} from './Signup/types';
import {UserScenesAction, userScenesReducer, UserScenesState} from './scenes';

const userReducers = {
  users: userReducer,
  signup: signupReducer,
  userScenes: userScenesReducer
};

export type UserAction = UserStoreAction | SignupAction | UserScenesAction;
export type UserState = SignupState | UserStoreState | UserScenesState;

export {
  Signup,
  Info,
  userMiddleware,
  userReducers,
  Others
};
