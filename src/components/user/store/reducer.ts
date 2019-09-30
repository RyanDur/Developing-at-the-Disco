import {OtherUser, UserAction, UserActions, UserState} from './types';

export const initialState: UserState = {
  current: {name: undefined, id: undefined},
  others: [] as OtherUser[]
};

export default (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
  case UserActions.CURRENT:
    return {...state, current: action.user};
  default:
    return state;
  }
};
