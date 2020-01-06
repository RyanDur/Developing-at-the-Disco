import {UserActions} from './UserActions';
import {OtherUsersPage} from '../../data/types';
import {Action} from '../../../../../lib/redux/types';

export interface OtherUsersAction extends Action<UserActions.OTHERS> {
  otherUsersPage: OtherUsersPage;
}
