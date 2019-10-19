import {State} from '../../../../../store/types';
import {CurrentUser, OtherUser} from '../user';

export interface UserStoreState extends State {
  current?: CurrentUser;
  others?: OtherUser[];
}
