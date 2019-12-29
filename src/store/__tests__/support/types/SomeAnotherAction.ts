import {TestActions} from './SomeAction';
import {Action} from '../../../redux/types';

export interface SomeAnotherAction extends Action<TestActions.ANOTHER_ACTION> {
  value: string;
}
