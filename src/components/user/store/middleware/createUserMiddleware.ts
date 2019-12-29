import {CurrentUser, UserActions} from '../types';
import {current} from '../actions';
import {SignupErrors} from '../../Signup/types';
import {invalidSignup} from '../../Signup/actions';
import {Either, isRight} from 'fp-ts/lib/Either';
import {Errors} from 'io-ts';
import {UserMiddlewareAction, UserMiddlewareState} from './types';
import {Create, Handler} from '../data/types';
import {logErrors} from '../../../util/loggers';
import {Dispatch, Middleware} from '../../../../store/redux/types';

const handle = (next: Dispatch): Handler => ({
  success: (user: Either<Errors, CurrentUser>) =>
    isRight(user) ? next(current(user.right)) : logErrors(user),
  clientError: (errors: Either<Errors, SignupErrors>) => {
    return isRight(errors) ? next(invalidSignup(errors.right)) : logErrors(errors);
  }
});

export const createUserMiddleware = (create: Create): Middleware<UserMiddlewareState, UserMiddlewareAction> =>
  ({dispatch}) => () => (action) => {
    if (action.type === UserActions.CREATE) {
      create({name: action.name}, handle(dispatch));
    }
  };
