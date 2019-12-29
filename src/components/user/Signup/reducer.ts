import {SignupState} from './types';
import {SignupAction, SignupValidations} from './actions';

export const initialState: SignupState = {};

export default (state = initialState, action: SignupAction): SignupState => {
  switch (action.type) {
    case SignupValidations.INVALID_SIGNUP:
      return {...state, ...action.errors};
    default:
      return state;
  }
};
