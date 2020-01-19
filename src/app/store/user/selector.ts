import {CurrentUser, UserState} from './types';
import {has} from '../../../lib/util/helpers';

export const selectUsernameErrors = ({userErrors}: UserState) =>
  userErrors.username;

export const currentUserName = ({users}: UserState) =>
  users.current.name;

export const currentUser = ({users}: UserState): CurrentUser =>
  users.current;

export const checkForCurrentUser = ({users}: UserState) =>
  has(users.current);

export const checkForCurrentUserReady = ({
  users,
  userScenes
}: UserState) => has(users.current) && userScenes.signupDone;

export const checkAuthorization = checkForCurrentUser;
