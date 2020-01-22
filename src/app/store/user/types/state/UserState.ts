import {UsersState} from './UsersState';
import {PageState} from './PageState';
import {UserErrorsState} from './UserErrorsState';
import {State} from '../../../../../lib/redux/types';

export interface UserState extends State {
  users: UsersState;
  userErrors: UserErrorsState;
  pages: PageState;
}
