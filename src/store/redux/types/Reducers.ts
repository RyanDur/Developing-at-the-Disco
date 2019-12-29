import {Action, AnyAction} from './Action';
import {AnyState, State} from './State';
import {Reducer} from './Reducer';

export type Reducers<S extends State = AnyState, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>
};
