import {SignupValidations, UserActions, UserErrorsAction} from '../action/types';
import {UserErrorsState} from '../types';
import {Reducer} from '../../../../lib/redux/types';

export const initialState: UserErrorsState = {};

export const userErrors: Reducer<UserErrorsState, UserErrorsAction> =
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
