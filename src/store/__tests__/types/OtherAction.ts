import {Action} from '../../types';
import {TestAction} from './TestAction';

export interface OtherAction extends Action<TestAction.OTHER_ACTION> {
  other: string;
}
