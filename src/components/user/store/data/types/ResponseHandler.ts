import {Dispatch} from '../../../../../lib/redux/types';
import {Handlers} from './Handlers';

export type ResponseHandler = (dispatch: Dispatch) => Handlers;
