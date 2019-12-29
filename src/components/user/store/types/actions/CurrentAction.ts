import {UserActions} from './UserActions';
import {CurrentUser} from '../user';
import {Action} from '../../../../../store/redux/types';

export interface CurrentAction extends Action<UserActions.CURRENT> {
  user: CurrentUser;
}
