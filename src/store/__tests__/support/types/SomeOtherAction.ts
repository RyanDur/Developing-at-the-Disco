import {TestActions} from './SomeAction';
import {Action} from '../../../redux/types';

export interface SomeOtherAction extends Action<TestActions.OTHER_ACTION> {
  value: string;
}
