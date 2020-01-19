import {UserActions, UserScenesAction, UserScenesActions} from '../action/types';
import {UserScenesState} from '../types';
import {Reducer} from '../../../../lib/redux/types';

export const initialState: UserScenesState = {
  signupDone: false
};

export const userScenes: Reducer<UserScenesState, UserScenesAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case UserScenesActions.SIGNUP_DONE:
        return {...state, signupDone: true};
      case UserActions.LOGOUT_SUCCESS:
        return initialState;
      default:
        return state;
    }
  };
