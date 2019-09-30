import {AllAction, CreateAction, CurrentAction, UpdateAction, UserActions, CurrentUser} from './types';

const all = (): AllAction => ({type: UserActions.ALL});

const create = (name: string): CreateAction => ({type: UserActions.CREATE, name});

const current = (user: CurrentUser): CurrentAction => ({type: UserActions.CURRENT, user});

const update = (user: CurrentUser): UpdateAction => ({type: UserActions.UPDATE, user});

export {
  all,
  create,
  update,
  current
};
