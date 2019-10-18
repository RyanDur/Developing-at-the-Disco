import {UserState} from './state/UserState';
import {UserComponentState} from './state';
import {CurrentUser, NewUser, OtherUser} from './user';
import {CreateAction, CurrentAction, UpdateAction, UserActions} from './actions';

type UserAction = CreateAction | UpdateAction | CurrentAction;

export {
  UserState,
  UserComponentState,
  NewUser,
  CurrentUser,
  OtherUser,
  UserAction,
  UserActions,
  UpdateAction,
  CreateAction,
  CurrentAction
};
