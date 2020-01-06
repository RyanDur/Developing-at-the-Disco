import {CurrentUser} from '../user';
import {OtherUsersPage} from '../../data/types';
import {State} from '../../../../../lib/redux/types';

export interface UsersState extends State {
  current?: CurrentUser;
  others?: OtherUsersPage;
}
