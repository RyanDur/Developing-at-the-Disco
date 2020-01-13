import {UserActions} from './UserActions';
import {Action} from '../../../../../lib/redux/types';
import {OtherUsersPage} from '../../types';

export interface OtherUsersAction extends Action<UserActions.OTHERS> {
  otherUsersPage: OtherUsersPage;
}
