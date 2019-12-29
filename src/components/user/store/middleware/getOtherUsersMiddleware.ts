import {UserActions} from '../types/actions';
import {UserMiddlewareAction, UserMiddlewareState} from './types';
import {others} from '../actions';
import {Either} from 'fp-ts/lib/Either';
import {isRight} from 'fp-ts/lib/These';
import {Errors} from 'io-ts';
import {GetAll, Handler, OtherUsersPage} from '../data/types';
import {logErrors} from '../../../util/loggers';
import {Dispatch, Middleware} from '../../../../store/redux/types';

const handle = (next: Dispatch): Handler => ({
  success: (users: Either<Errors, OtherUsersPage>) =>
    isRight(users) ? next(others(users.right)) : logErrors(users)
});

export const getOtherUsersMiddleware = (getAll: GetAll): Middleware<UserMiddlewareState, UserMiddlewareAction> =>
  () => (next) => (action) => {
    if (UserActions.CURRENT === action.type) {
      getAll(action.user.id, handle(next));
    }
  };
