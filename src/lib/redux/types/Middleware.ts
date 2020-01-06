import {MiddlewareAPI} from './MiddlewareAPI';
import {Action, AnyAction} from './Action';
import {Dispatch} from './Dispatch';
import {AnyState, State} from './State';

export type Middleware<S extends State = AnyState, A extends Action = AnyAction> =
  (api: MiddlewareAPI<S, A>) => (next: Dispatch<A>) => (action: AnyAction) => any;
