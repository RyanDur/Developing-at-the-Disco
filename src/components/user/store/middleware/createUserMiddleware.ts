import {Dispatch, Middleware} from '../../../../store/types';
import {current} from '../actions';
import {CurrentUser, UserAction, UserActions, UserState} from '../types';
import {Create} from '../core';

const onSuccess = (next: Dispatch) => (user: CurrentUser) => next(current(user));

export const createUserMiddleware = (createUser: Create): Middleware<UserState, UserAction> =>
  () => (next) => (action) => {
    if (UserActions.CREATE === action.type) {
      createUser({name: action.name}, onSuccess(next));
    }
  };
