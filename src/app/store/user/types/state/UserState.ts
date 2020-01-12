import {UsersState} from './UsersState';
import {UserScenesState} from './UserScenesState';
import {UserErrorsState} from './UserErrorsState';
import {State} from '../../../../../lib/redux/types';

export interface UserState extends State {
  users: UsersState;
  userErrors: UserErrorsState;
  userScenes: UserScenesState;
}
