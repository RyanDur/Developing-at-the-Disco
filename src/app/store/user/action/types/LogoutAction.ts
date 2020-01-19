import {Action} from '../../../../../lib/redux/types';
import {UserActions} from './index';

export interface LogoutAction extends Action<UserActions.LOGOUT> {
  id: string;
}
