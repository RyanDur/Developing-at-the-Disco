import {UserScenesAction, UserScenesActions} from '../action/types';
import {Reducer} from '../../../../store/redux/types';
import {UserScenesState} from '../types';

const initialState: UserScenesState = {
  signupDone: false
};

export const userScenes: Reducer<UserScenesState, UserScenesAction> =
  (state = initialState, action) =>
    action.type === UserScenesActions.SIGNUP_DONE ?
      {...state, signupDone: true} : state;
