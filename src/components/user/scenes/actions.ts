import {Action} from '../../../store/redux/types';

export enum UserScenesActions {
  SIGNUP_DONE = 'Signup done'
}

interface SignupDone extends Action<UserScenesActions.SIGNUP_DONE> {
  signupIsDone: boolean;
}

export const signupDone = (signupIsDone: boolean): SignupDone => ({
  type: UserScenesActions.SIGNUP_DONE,
  signupIsDone
});

export type UserScenesAction = SignupDone;
