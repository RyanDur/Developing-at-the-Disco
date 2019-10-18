import {UserActions} from './UserActions';
import {Action} from '../../../../../store/types';
import {CurrentUser} from '../user';

export interface UpdateAction extends Action<UserActions.UPDATE> {
  user: CurrentUser;
}
