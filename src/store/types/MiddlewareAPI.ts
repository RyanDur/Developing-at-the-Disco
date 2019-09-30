
import {Action, AnyAction} from './Action';
import {Dispatch} from './Dispatch';

export interface MiddlewareAPI<S, A extends Action = AnyAction> {
  dispatch: Dispatch<A>;

  getState(): S;
}
