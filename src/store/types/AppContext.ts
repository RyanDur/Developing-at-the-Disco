import {Dispatch} from './Dispatch';

export interface AppContext<S> {
  state: S;
  dispatch: Dispatch;
}
