import {CurrentUser} from '../user';
import {State} from '../../../../../lib/redux/types';
import {OtherUsersPage} from '../../../../data/types';

export interface UsersState extends State {
  current?: CurrentUser;
  others?: OtherUsersPage;
}
