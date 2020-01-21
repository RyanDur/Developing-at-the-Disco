import {CurrentUser, UserState} from './types';
import {has} from '../../../lib/util/helpers';

export const usernameErrors = ({userErrors}: UserState) =>
  userErrors.username;

export const currentUser = ({users}: UserState): CurrentUser =>
  users.current;
