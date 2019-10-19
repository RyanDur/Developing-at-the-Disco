import {SignupState} from './types';

export const selectUsernameErrors = (signup: SignupState): any => {
  return signup.username;
};
