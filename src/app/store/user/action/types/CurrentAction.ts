import {UserActions} from './UserActions';
import {CurrentUser} from '../../types';
import {Action} from '../../../../../lib/redux/types';

export interface CurrentAction extends Action<UserActions.CURRENT> {
  user: CurrentUser;
}
