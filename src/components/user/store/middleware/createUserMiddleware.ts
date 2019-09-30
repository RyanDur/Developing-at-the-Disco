import {Dispatch, Middleware} from '../../../../store/types';
import {current} from '../actions';
import {CurrentUser, UserAction, UserActions, UserState} from '../types';
import {Create} from '../data';

const onSuccess = (next: Dispatch) => (user: CurrentUser) => next(current(user));

export const createUserMiddleware = (create: Create): Middleware<UserState, UserAction> =>
  () => (next) => (action) => {
    if (UserActions.CREATE === action.type) {
      create({name: action.name}, onSuccess(next));
    }
  };
