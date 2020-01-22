import {Middleware} from '../../../../lib/redux/types';
import {UserAction, UserActions} from '../action/types';
import {userClient} from '../../../data';
import {UserState} from '../types/state';
import {ResponseHandlers} from '../types';
import {logoutSuccess} from '../action';

const handle: ResponseHandlers = (dispatch) => ({
  onSuccess: () => dispatch(logoutSuccess())
});

export const logoutMiddleware: Middleware<UserState, UserAction> =
  () => next => action => {
    if (action.type === UserActions.LOGOUT) {
      userClient.logout(action.id, handle(next));
    }
    next(action);
  };
