import {Dispatch, Middleware} from '../../../../store/types';
import {UserActions} from '../types/actions';
import {UserMiddlewareAction, UserMiddlewareState} from './types';
import {OtherUsers} from '../types/user';
import {others} from '../actions';
import {Either} from 'fp-ts/lib/Either';
import {isRight} from 'fp-ts/lib/These';
import {Errors} from 'io-ts';
import {GetAll, Handler} from '../data/types';

const handle = (next: Dispatch): Handler => ({
  success: (users: Either<Errors, OtherUsers>) =>
    isRight(users) && next(others(users.right))
});

export const getOtherUsersMiddleware = (getAll: GetAll): Middleware<UserMiddlewareState, UserMiddlewareAction> =>
  () => (next) => (action) => {
    if (UserActions.CURRENT === action.type) {
      getAll(action.user.id, handle(next));
    }
  };
