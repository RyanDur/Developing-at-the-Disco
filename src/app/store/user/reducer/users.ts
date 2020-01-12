import {UsersState} from '../types';
import {UserAction, UserActions} from '../action/types';

export const initialState: UsersState = {};

export const users = (state = initialState, action: UserAction): UsersState => {
  switch (action.type) {
    case UserActions.CURRENT:
      return {...state, current: action.user};
    case UserActions.OTHERS:
      return {...state, others: action.otherUsersPage};
    default:
      return state;
  }
};
