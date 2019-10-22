import {OtherUser, UserActions, UserStoreAction, UserStoreState} from './types';

export const initialState: UserStoreState = {
  others: [] as OtherUser[]
};

export default (state = initialState, action: UserStoreAction): UserStoreState => {
  switch (action.type) {
  case UserActions.CURRENT:
    return {...state, current: action.user};
  case UserActions.OTHERS:
    return {...state, others: action.otherUsers};
  default:
    return state;
  }
};
