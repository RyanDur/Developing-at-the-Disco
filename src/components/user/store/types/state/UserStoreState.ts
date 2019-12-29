import {CurrentUser} from '../user';
import {OtherUsersPage} from '../../data/types';
import {State} from '../../../../../store/redux/types';

export interface UserStoreState extends State {
  current?: CurrentUser;
  others?: OtherUsersPage;
}
