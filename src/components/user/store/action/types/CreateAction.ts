import {UserActions} from './UserActions';
import {Action} from '../../../../../store/redux/types';
import {Username} from '../../types/user';

export interface CreateAction extends Action<UserActions.CREATE> {
  name: Username;
}
