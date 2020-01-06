import {UserActions} from './UserActions';
import {Action} from '../../../../../lib/redux/types';
import {UserId} from '../../types/user';

export interface GetOtherUsersAction extends Action<UserActions.OTHERS> {
  exclude: UserId[];
}
