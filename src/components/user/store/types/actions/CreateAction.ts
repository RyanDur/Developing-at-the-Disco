import {Action} from '../../../../../store/types';
import {UserActions} from './UserActions';

export interface CreateAction extends Action<UserActions.CREATE> {
  name: string;
}
