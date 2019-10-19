import {UserStoreState} from './UserStoreState';
import {SignupState} from '../../../Signup/types';

export interface UserComponentState {
  users: UserStoreState;
  signup: SignupState;
}
