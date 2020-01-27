import {
  CreateAction, CurrentAction,
  InvalidSignupAction,
  LogoutAction,
  OtherUsersAction,
  SignupValidations, UpdateAction,
  UserActions
} from './types';
import {CurrentUser, OtherUsersPage, SignupErrors} from '../types';
import {LogoutSuccess} from './types/LogoutSuccessAction';
import {Username} from '../types/user';

const others = (otherUsersPage: OtherUsersPage): OtherUsersAction => ({type: UserActions.OTHERS, otherUsersPage});

const createNewUser = (name: Username, password: string): CreateAction => ({type: UserActions.CREATE, name, password});

const current = (user: CurrentUser): CurrentAction => ({type: UserActions.CURRENT, user});

const update = (user: CurrentUser): UpdateAction => ({type: UserActions.UPDATE, user});

const logout = (id: string): LogoutAction => ({type: UserActions.LOGOUT, id});

const logoutSuccess = (): LogoutSuccess => ({type: UserActions.LOGOUT_SUCCESS});

const invalidSignup = (errors: SignupErrors): InvalidSignupAction => ({
  type: SignupValidations.INVALID_SIGNUP,
  errors
});

export {
  createNewUser,
  update,
  current,
  others,
  logout,
  logoutSuccess,
  invalidSignup
};
