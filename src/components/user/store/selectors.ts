import {ComponentState} from '../../index';
import {has, not} from '../../util/helpers';
import {UserState} from './types/state';

export const selectUsernameErrors = ({userErrors}: UserState) =>
  userErrors.username;

export const currentUserName = ({users}: UserState) =>
  users.current.name;

export const checkForCurrentUser = ({users}: UserState) =>
  has(users.current);

export const checkForCurrentUserReady = ({
  users,
  userScenes
}: UserState) => has(users.current) && userScenes.signupDone;

export const checkAuthorization = ({users, userScenes}: UserState) =>
  not(users.current || userScenes.signupDone);
