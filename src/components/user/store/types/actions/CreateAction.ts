import {UserActions} from './UserActions';
import {Username} from '../user';
import {Action} from '../../../../../store/redux/types';

export interface CreateAction extends Action<UserActions.CREATE> {
  name: Username;
}
