import {others} from '../action';
import {UserAction, UserActions} from '../action/types';
import {UserState} from '../types/state';
import {userClient} from '../../../data';
import {Middleware} from '../../../../lib/redux/types';
import {OtherUsersPage, ResponseHandler} from '../types';

const handle: ResponseHandler = (dispatch) => ({
  onSuccess: (usersPage: OtherUsersPage) => dispatch(others(usersPage))
});

export const getOtherUsersMiddleware: Middleware<UserState, UserAction> =
  () => (next) => (action) => {
    if (UserActions.CURRENT === action.type) {
      userClient.getAll(action.user.id, handle(next));
    }
  };