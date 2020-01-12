import {SignupDone, UserScenesActions} from './types';

export const signupDone = (signupIsDone: boolean): SignupDone => ({
  type: UserScenesActions.SIGNUP_DONE,
  signupIsDone
});
