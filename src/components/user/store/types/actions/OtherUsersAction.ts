import {Action} from '../../../../../store/types';
import {UserActions} from './UserActions';
import {OtherUsers} from '../user';

export interface OtherUsersAction extends Action<UserActions.OTHERS> {
  otherUsers: OtherUsers;
}
