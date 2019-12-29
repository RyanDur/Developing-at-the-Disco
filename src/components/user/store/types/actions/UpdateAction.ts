import {UserActions} from './UserActions';
import {CurrentUser} from '../user';
import {Action} from '../../../../../store/redux/types';

export interface UpdateAction extends Action<UserActions.UPDATE> {
  user: CurrentUser;
}
