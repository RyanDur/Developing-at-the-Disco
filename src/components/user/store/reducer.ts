import {UserActions, UserStoreAction, UserStoreState} from './types';

export const initialState: UserStoreState = {};

export default (state = initialState, action: UserStoreAction): UserStoreState => {
  switch (action.type) {
  case UserActions.CURRENT:
    return {...state, current: action.user};
  case UserActions.OTHERS:
    return {...state, others: action.otherUsersPage};
  default:
    return state;
  }
};
