import {UserComponentState, UserStoreState} from './state';
import {CurrentUser, NewUser, OtherUser} from './user';
import {CreateAction, CurrentAction, OtherUsersAction, UpdateAction, UserActions} from './actions';
import {SomeOtherAction} from '../../../../store/__tests__/support/types';

type UserStoreAction = CreateAction | UpdateAction | CurrentAction | SomeOtherAction | OtherUsersAction;

export {
  UserStoreState,
  UserComponentState,
  NewUser,
  CurrentUser,
  OtherUser,
  UserStoreAction,
  UserActions,
  UpdateAction,
  CreateAction,
  CurrentAction
};
