import {CreateAction, CurrentAction, CurrentUser, UpdateAction, UserActions} from './types';
import {OtherUsersAction} from './types/actions';
import {Username} from './types/user';
import {OtherUsersPage} from './data/types';

const others = (otherUsersPage: OtherUsersPage): OtherUsersAction => ({type: UserActions.OTHERS, otherUsersPage});

const create = (name: Username): CreateAction => ({type: UserActions.CREATE, name});

const current = (user: CurrentUser): CurrentAction => ({type: UserActions.CURRENT, user});

const update = (user: CurrentUser): UpdateAction => ({type: UserActions.UPDATE, user});

export {
  create,
  update,
  current,
  others
};
