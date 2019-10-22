import {Action} from '../../../../../store/types';
import {UserActions} from './UserActions';
import {UserId} from '../user';

export interface GetOtherUsersAction extends Action<UserActions.OTHERS> {
  exclude: UserId[];
}
