import {UserActions} from './UserActions';
import {Action} from '../../../../../lib/redux/types';
import {CurrentUser} from '../../types';

export interface CurrentAction extends Action<UserActions.CURRENT> {
  user: CurrentUser;
}
