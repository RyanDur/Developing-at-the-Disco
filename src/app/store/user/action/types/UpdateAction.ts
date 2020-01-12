import {UserActions} from './UserActions';
import {CurrentUser} from '../../types';
import {Action} from '../../../../../lib/redux/types';

export interface UpdateAction extends Action<UserActions.UPDATE> {
  user: CurrentUser;
}
