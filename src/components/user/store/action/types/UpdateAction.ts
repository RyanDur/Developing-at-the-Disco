import {UserActions} from './UserActions';
import {Action} from '../../../../../store/redux/types';
import {CurrentUser} from '../../types';

export interface UpdateAction extends Action<UserActions.UPDATE> {
  user: CurrentUser;
}
