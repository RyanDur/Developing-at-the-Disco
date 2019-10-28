import {State} from '../../../../../store/types';
import {CurrentUser, OtherUser} from '../user';
import {OtherUsersPage} from '../../data/types';

export interface UserStoreState extends State {
  current?: CurrentUser;
  others?: OtherUsersPage;
}
