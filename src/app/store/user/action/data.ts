import {CreateAction, CurrentAction, OtherUsersAction, UpdateAction, UserActions} from './types';
import {CurrentUser, OtherUsersPage, Username} from '../types/user';

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
