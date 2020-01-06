import {CurrentUser, UserState} from '../types';
import {current, invalidSignup} from '../action';
import {SignupErrors} from '../../Signup/types';
import {Either, isRight} from 'fp-ts/lib/Either';
import {Errors} from 'io-ts';
import {Create, Handler} from '../data/types';
import {Action, Dispatch, Middleware, State} from '../../../../lib/redux/types';
import {UserAction, UserActions} from '../action/types';
import {logErrors} from '../../../loggers';

const handle = (next: Dispatch): Handler => ({
  success: (user: Either<Errors, CurrentUser>) =>
    isRight(user) ? next(current(user.right)) : logErrors(user),
  clientError: (errors: Either<Errors, SignupErrors>) =>
    isRight(errors) ? next(invalidSignup(errors.right)) : logErrors(errors)
});

export const createUserMiddleware = <S extends State = UserState, A extends Action = UserAction>
(create: Create): Middleware<S, A> =>
  ({dispatch}) => () => (action) => {
    if (action.type === UserActions.CREATE) {
      create({name: action.name}, handle(dispatch));
    }
  };
