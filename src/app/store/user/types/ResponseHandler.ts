import {Handlers} from './Handlers';
import {Dispatch} from '../../../../lib/redux/types';

export type ResponseHandler = (dispatch: Dispatch) => Handlers;
