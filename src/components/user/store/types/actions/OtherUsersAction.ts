import {Action} from '../../../../../store/types';
import {UserActions} from './UserActions';
import {OtherUsers} from '../user';
import {OtherUsersPage} from '../../data/types';

export interface OtherUsersAction extends Action<UserActions.OTHERS> {
  otherUsersPage: OtherUsersPage;
}
