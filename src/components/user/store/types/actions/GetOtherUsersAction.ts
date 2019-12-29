import {UserActions} from './UserActions';
import {UserId} from '../user';
import {Action} from '../../../../../store/redux/types';

export interface GetOtherUsersAction extends Action<UserActions.OTHERS> {
  exclude: UserId[];
}
