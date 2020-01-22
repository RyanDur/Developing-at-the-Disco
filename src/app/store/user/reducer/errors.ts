import {SignupValidations, UserActions, ErrorsAction} from '../action/types';
import {ErrorsState} from '../types';
import {Reducer} from '../../../../lib/redux/types';

export const initialState: ErrorsState = {};

export const errors: Reducer<ErrorsState, ErrorsAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case SignupValidations.INVALID_SIGNUP:
        return {...state, ...action.errors};
      case UserActions.CURRENT:
        return initialState;
      default:
        return state;
    }
  };
