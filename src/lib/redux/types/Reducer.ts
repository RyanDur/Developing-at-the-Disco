import {AnyState, State} from './State';
import {Action, AnyAction} from './Action';

export type Reducer<S extends State = AnyState, A extends Action = AnyAction> =
  (currentState: S, action: A) => S;

export type AnyReducer = Reducer;
