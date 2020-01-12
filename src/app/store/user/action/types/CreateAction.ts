import {UserActions} from './UserActions';
import {Username} from '../../types/user';
import {Action} from '../../../../../lib/redux/types';

export interface CreateAction extends Action<UserActions.CREATE> {
  name: Username;
}
