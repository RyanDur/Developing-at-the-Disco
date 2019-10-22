import {UserComponentState, UserStoreState} from './state';
import {CurrentUser, NewUser, OtherUser} from './user';
import {CreateAction, CurrentAction, OtherUsersAction, UpdateAction, UserActions} from './actions';
import {OtherAction} from '../../../../store/__tests__/types';

type UserStoreAction = CreateAction | UpdateAction | CurrentAction | OtherAction | OtherUsersAction;

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
