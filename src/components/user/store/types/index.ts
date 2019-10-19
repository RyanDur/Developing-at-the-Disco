import {UserComponentState, UserStoreState} from './state';
import {CurrentUser, NewUser, OtherUser} from './user';
import {CreateAction, CurrentAction, UpdateAction, UserActions} from './actions';

type UserStoreAction = CreateAction | UpdateAction | CurrentAction;

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
