import {Action} from '../../../../../store/types';
import {UserActions} from './UserActions';
import {CurrentUser} from '../user';

export interface CurrentAction extends Action<UserActions.CURRENT> {
  user: CurrentUser;
}
