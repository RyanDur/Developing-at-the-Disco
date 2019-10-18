import {State} from '../../../../../store/types';
import {CurrentUser, OtherUser} from '../user';

export interface UserState extends State {
  current?: CurrentUser;
  others?: OtherUser[];
}
