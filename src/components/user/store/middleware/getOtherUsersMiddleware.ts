import {others} from '../action';
import {Either} from 'fp-ts/lib/Either';
import {isRight} from 'fp-ts/lib/These';
import {Errors} from 'io-ts';
import {GetAll, Handler, OtherUsersPage} from '../data/types';
import {logErrors} from '../../../util/loggers';
import {Action, Dispatch, Middleware, State} from '../../../../store/redux/types';
import {UserAction, UserActions} from '../action/types';
import {UserState} from '../types/state';

const handle = (next: Dispatch): Handler => ({
  success: (users: Either<Errors, OtherUsersPage>) =>
    isRight(users) ? next(others(users.right)) : logErrors(users)
});

export const getOtherUsersMiddleware = <S extends State = UserState, A extends Action = UserAction>
(getAll: GetAll): Middleware<S, A> =>
  () => (next) => (action) => {
    if (UserActions.CURRENT === action.type) {
      getAll(action.user.id, handle(next));
    }
  };
