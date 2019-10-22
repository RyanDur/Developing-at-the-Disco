import {Dispatch, Middleware} from '../../../../store/types';
import {CurrentUser, UserActions} from '../types';
import {current} from '../actions';
import {SignupErrors} from '../../Signup/types';
import {invalidSignup} from '../../Signup/actions';
import {Either, isRight} from 'fp-ts/lib/Either';
import {Errors} from 'io-ts';
import {UserMiddlewareAction, UserMiddlewareState} from './types';
import {Create, Handler} from '../data/types';
import {logErrors} from '../../../util/loggers';

const handle = (next: Dispatch): Handler => ({
  success: (user: Either<Errors, CurrentUser>) =>
    isRight(user) ? next(current(user.right)) : logErrors(user.left),
  clientError: (errors: Either<Errors, SignupErrors>) =>
    isRight(errors) ? next(invalidSignup(errors.right)) : logErrors(errors.left)
});

export const createUserMiddleware = (create: Create): Middleware<UserMiddlewareState, UserMiddlewareAction> =>
  ({dispatch}) => () => (action) => {
    if (action.type === UserActions.CREATE) {
      create(action.name, handle(dispatch));
    }
  };
