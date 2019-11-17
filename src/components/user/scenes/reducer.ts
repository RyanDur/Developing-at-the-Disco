import {UserScenesAction, UserScenesActions} from './actions';

export interface UserScenesState {
  signupDone: boolean;
}

const initialState: UserScenesState = {
  signupDone: false
};

export default (state = initialState, action: UserScenesAction): UserScenesState =>
  action.type === UserScenesActions.SIGNUP_DONE ? {...state, signupDone: true} : state;
