import {ResponseHandler} from './ResponseHandler';
import {Dispatch} from '../../../../lib/redux/types';

export type ResponseHandlers = (dispatch: Dispatch) => ResponseHandler;
