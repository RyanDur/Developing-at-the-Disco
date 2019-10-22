import {CreateAction, CurrentAction, CurrentUser, OtherUser, UpdateAction, UserActions} from './types';
import {OtherUsersAction} from './types/actions';
import {Username} from './types/user';

const others = (otherUsers: OtherUser[]): OtherUsersAction => ({type: UserActions.OTHERS, otherUsers});

const create = (name: Username): CreateAction => ({type: UserActions.CREATE, name});

const current = (user: CurrentUser): CurrentAction => ({type: UserActions.CURRENT, user});

const update = (user: CurrentUser): UpdateAction => ({type: UserActions.UPDATE, user});

export {
  create,
  update,
  current,
  others
};
