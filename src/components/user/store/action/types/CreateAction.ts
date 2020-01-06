import {UserActions} from './UserActions';
import {Action} from '../../../../../lib/redux/types';
import {Username} from '../../types/user';

export interface CreateAction extends Action<UserActions.CREATE> {
  name: Username;
}
