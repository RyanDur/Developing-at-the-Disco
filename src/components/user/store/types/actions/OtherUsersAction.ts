import {UserActions} from './UserActions';
import {OtherUsersPage} from '../../data/types';
import {Action} from '../../../../../store/redux/types';

export interface OtherUsersAction extends Action<UserActions.OTHERS> {
  otherUsersPage: OtherUsersPage;
}
