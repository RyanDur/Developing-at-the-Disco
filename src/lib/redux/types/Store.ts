import {Dispatch} from './Dispatch';
import {AnyAction} from './Action';
import {Listener} from './Listener';
import {Unsubscribe} from './Unsubscribe';
import {AnyState, State} from './State';

export interface Store<S extends State = AnyState, A extends AnyAction = AnyAction> {
  dispatch: Dispatch<A>;

  getState(): S;

  subscribe(listener: Listener): Unsubscribe;
}
