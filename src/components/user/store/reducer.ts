import {OtherUser, UserAction, UserActions, UserState} from './types';

export const initialState: UserState = {
  others: [] as OtherUser[]
};

export default (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
  case UserActions.CURRENT:
    return {...state, current: action.user};
  default:
    return state;
  }
};
