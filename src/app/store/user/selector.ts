import {CurrentUser, UserState} from './types';
import {has} from '../../../lib/util/helpers';
import {Page} from './action/types';

export const usernameErrors = ({errors}: UserState) =>
  errors.username;

export const currentUser = ({users}: UserState): CurrentUser =>
  users.current;

export const isAuthorizationDone = ({pages}: UserState) => {
  return pages.page === Page.SIGNUP;
};
