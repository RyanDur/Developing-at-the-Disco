import {Dispatch, Middleware} from '../../../../store/types';
import {CurrentUser, UserStoreAction, UserActions, UserStoreState} from '../types';
import {Create} from '../data';
import {current} from '../actions';
import {SignupErrors, SignupState} from '../../Signup/types';
import {invalidSignup, SignupAction} from '../../Signup/actions';
import {Handler} from '../data/create';
import {Either, isRight} from 'fp-ts/lib/Either';
import {Errors} from 'io-ts';
import {logInvalid} from '../../../util/loggers/logInvalid';

const handle = (next: Dispatch): Handler => ({
  success: (user: Either<Errors, CurrentUser>) =>
    logInvalid(user) && isRight(user) && next(current(user.right)),
  clientError: (errors: Either<Errors, SignupErrors>) =>
    logInvalid(errors) && isRight(errors) && next(invalidSignup(errors.right))
});

type UserMiddlewareState = UserStoreState | SignupState;
type UserMiddlewareAction = UserStoreAction | SignupAction;

export const createUserMiddleware = (create: Create): Middleware<UserMiddlewareState, UserMiddlewareAction> =>
  () => (next) => (action) => {
    if (UserActions.CREATE === action.type) {
      create({name: action.name}, handle(next));
    }
  };
