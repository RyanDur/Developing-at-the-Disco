import {CreateAction, CurrentAction, CurrentUser, UpdateAction, UserActions} from './types';

const create = (name: string): CreateAction => ({type: UserActions.CREATE, name});

const current = (user: CurrentUser): CurrentAction => ({type: UserActions.CURRENT, user});

const update = (user: CurrentUser): UpdateAction => ({type: UserActions.UPDATE, user});

export {
  create,
  update,
  current
};
