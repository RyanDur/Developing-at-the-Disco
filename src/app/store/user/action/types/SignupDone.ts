import {UserScenesActions} from './UserScenesActions';
import {Action} from '../../../../../lib/redux/types';

export interface SignupDone extends Action<UserScenesActions.SIGNUP_DONE> {
  signupIsDone: boolean;
}
