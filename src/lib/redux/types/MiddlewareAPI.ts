import {Action, AnyAction} from './Action';
import {Dispatch} from './Dispatch';
import {AnyState, State} from './State';

export interface MiddlewareAPI<S extends State = AnyState, A extends Action = AnyAction> {
  dispatch: Dispatch<A>;

  getState(): S;
}
