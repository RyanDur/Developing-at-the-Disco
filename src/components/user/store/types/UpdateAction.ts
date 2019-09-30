import {Action} from '../../../../store/types';
import {UserActions} from './UserActions';
import {CurrentUser} from './CurrentUser';

export interface UpdateAction extends Action<UserActions.UPDATE> {
  user: CurrentUser;
}
