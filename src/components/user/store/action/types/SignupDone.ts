import {Action} from '../../../../../store/redux/types';
import {UserScenesActions} from './UserScenesActions';

export interface SignupDone extends Action<UserScenesActions.SIGNUP_DONE> {
  signupIsDone: boolean;
}
