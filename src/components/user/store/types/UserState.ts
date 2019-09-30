import {State} from '../../../../store/types';
import {NewUser} from './NewUser';
import {CurrentUser} from './CurrentUser';
import {OtherUser} from './OtherUser';

export interface UserState extends State {
  current?: CurrentUser;
  others?: OtherUser[];
}
