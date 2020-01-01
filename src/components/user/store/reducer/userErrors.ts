import {Reducer} from '../../../../store/redux/types';
import {SignupValidations, UserErrorsAction} from '../action/types';
import {UserErrorsState} from '../types';

export const initialState: UserErrorsState = {};

export const userErrors: Reducer<UserErrorsState, UserErrorsAction> =
  (state = initialState, action) =>
    action.type === SignupValidations.INVALID_SIGNUP ?
      {...state, ...action.errors} : state;
