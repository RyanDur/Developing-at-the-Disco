import {Action} from '../../../../../store/types';
import {UserActions} from './UserActions';
import {Username} from '../user';

export interface CreateAction extends Action<UserActions.CREATE> {
  name: Username;
}
