import {Action} from '../../types';
import {TestAction} from './TestAction';
import {OtherUser} from '../../../components/user/store/types/user';

export interface OtherAction extends Action<TestAction.OTHER_ACTION> {
  other: string;
}
