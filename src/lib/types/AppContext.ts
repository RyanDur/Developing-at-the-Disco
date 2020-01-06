import {Dispatch} from '../redux/types';

export interface AppContext<S> {
  state: S;
  dispatch: Dispatch;
}
