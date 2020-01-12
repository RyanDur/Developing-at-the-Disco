import {UserActions} from './UserActions';
import {UserId} from '../../types/user';
import {Action} from '../../../../../lib/redux/types';

export interface GetOtherUsersAction extends Action<UserActions.OTHERS> {
  exclude: UserId[];
}
