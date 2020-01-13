import {CurrentUser, OtherUsersPage} from '../user';
import {State} from '../../../../../lib/redux/types';

export interface UsersState extends State {
  current?: CurrentUser;
  others?: OtherUsersPage;
}
