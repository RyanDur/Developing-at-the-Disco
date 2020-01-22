import {InvalidSignupAction} from './InvalidSignupAction';
import {SignupValidations} from './SignupValidations';
import {PageActions} from './PageActions';
import {PageDone} from './PageDone';
import {UpdateAction} from './UpdateAction';
import {CurrentAction} from './CurrentAction';
import {OtherUsersAction} from './OtherUsersAction';
import {GetOtherUsersAction} from './GetOtherUsersAction';
import {CreateAction} from './CreateAction';
import {UserActions} from './UserActions';
import {LogoutAction} from './LogoutAction';
import {LogoutSuccess} from './LogoutSuccessAction';
import {Page} from './Page';

export type UserAction = CurrentAction
  | CreateAction
  | UpdateAction
  | OtherUsersAction
  | LogoutAction
  | LogoutSuccess;
export type ErrorsAction = InvalidSignupAction | UserAction;

export {
  Page,
  UserActions,
  SignupValidations,
  InvalidSignupAction,
  PageDone,
  UpdateAction,
  PageActions,
  CurrentAction,
  OtherUsersAction,
  GetOtherUsersAction,
  CreateAction,
  LogoutAction
};
