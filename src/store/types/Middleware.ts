import {MiddlewareAPI} from './MiddlewareAPI';
import {Action, AnyAction} from './Action';
import {Dispatch} from './Dispatch';

export type Middleware<S extends any, A extends Action = AnyAction> =
  (api: MiddlewareAPI<S, A>) => (next: Dispatch<AnyAction>) => (action: any) => any;
