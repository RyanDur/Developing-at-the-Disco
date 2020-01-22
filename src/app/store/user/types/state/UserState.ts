import {UsersState} from './UsersState';
import {PageState} from './PageState';
import {ErrorsState} from './ErrorsState';
import {State} from '../../../../../lib/redux/types';

export interface UserState extends State {
  users: UsersState;
  errors: ErrorsState;
}
