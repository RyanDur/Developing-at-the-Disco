import {CurrentUser, ResponseHandlers, SignupErrors, UserState} from '../types';
import {current, invalidSignup} from '../action';
import {UserAction, UserActions} from '../action/types';
import {Middleware} from '../../../../lib/redux/types';
import {userClient} from '../../../data';

const handle: ResponseHandlers = (dispatch) => ({
  onSuccess: (user: CurrentUser) => dispatch(current(user)),
  onClientError: (errors: SignupErrors) => dispatch(invalidSignup(errors))
});

export const createUserMiddleware: Middleware<UserState, UserAction> =
  ({dispatch}) => () => (action) => {
    if (action.type === UserActions.CREATE) {
      userClient.create({name: action.name}, handle(dispatch));
    }
  };
