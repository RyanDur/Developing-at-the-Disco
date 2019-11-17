import {UserStoreState} from './UserStoreState';
import {SignupState} from '../../../Signup/types';
import {UserScenesState} from '../../../scenes';

export interface UserComponentState {
  users: UserStoreState;
  signup: SignupState;
  userScenes: UserScenesState;
}
