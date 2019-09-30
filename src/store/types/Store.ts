import {Dispatch} from './Dispatch';
import {Action, AnyAction} from './Action';

export interface Store<S, A extends Action = AnyAction> {
  dispatch: Dispatch<A>;

  getState(): S;
}
