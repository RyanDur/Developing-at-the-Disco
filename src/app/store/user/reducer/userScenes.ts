import {UserScenesAction, UserScenesActions} from '../action/types';
import {UserScenesState} from '../types';
import {Reducer} from '../../../../lib/redux/types';

const initialState: UserScenesState = {
  signupDone: false
};

export const userScenes: Reducer<UserScenesState, UserScenesAction> =
  (state = initialState, action) =>
    action.type === UserScenesActions.SIGNUP_DONE ?
      {...state, signupDone: true} : state;
