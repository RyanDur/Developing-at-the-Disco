import {Action, AnyAction, Dispatch} from '../../../../lib/redux/types';
import {ResponseHandler} from '../data/types';

export type Handle = <A extends Action = AnyAction>(next: Dispatch) => ResponseHandler;
