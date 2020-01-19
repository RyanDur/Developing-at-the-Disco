import {InvalidSignupAction} from './InvalidSignupAction';
import {SignupValidations} from './SignupValidations';
import {UserScenesActions} from './UserScenesActions';
import {SignupDone} from './SignupDone';
import {UpdateAction} from './UpdateAction';
import {CurrentAction} from './CurrentAction';
import {OtherUsersAction} from './OtherUsersAction';
import {GetOtherUsersAction} from './GetOtherUsersAction';
import {CreateAction} from './CreateAction';
import {UserActions} from './UserActions';
import {LogoutAction} from './LogoutAction';
import {LogoutSuccess} from './LogoutSuccessAction';

export type UserErrorsAction = InvalidSignupAction;
export type UserScenesAction = SignupDone;
export type UsersAction = CurrentAction | CreateAction | UpdateAction | OtherUsersAction | LogoutAction | LogoutSuccess;
export type UserAction = UserScenesAction | UsersAction | UserErrorsAction;

export {
  UserActions,
  SignupValidations,
  InvalidSignupAction,
  SignupDone,
  UpdateAction,
  UserScenesActions,
  CurrentAction,
  OtherUsersAction,
  GetOtherUsersAction,
  CreateAction,
  LogoutAction
};
