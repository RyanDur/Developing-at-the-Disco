import {CurrentUser, UserState} from '../types';
import {current, invalidSignup} from '../action';
import {SignupErrors} from '../../Signup/types';
import {ResponseHandler} from '../data/types';
import {Middleware} from '../../../../lib/redux/types';
import {UserAction, UserActions} from '../action/types';
import {userClient} from '../data';

const handle: ResponseHandler = (dispatch) => ({
  onSuccess: (user: CurrentUser) => dispatch(current(user)),
  onClientError: (errors: SignupErrors) => dispatch(invalidSignup(errors))
});

export const createUserMiddleware: Middleware<UserState, UserAction> =
  ({dispatch}) => () => (action) => {
    if (action.type === UserActions.CREATE) {
      userClient.create({name: action.name}, handle(dispatch));
    }
  };
