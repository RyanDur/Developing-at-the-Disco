import {endpoint} from '../../../../config';
import {SignupValidationGuard} from '../../Signup/types/UsernameValidation';
import {CurrentUserGuard} from '../types/user/CurrentUser';
import {UserClient} from './types';
import {http} from './http';
import {get, post} from './methods';
import {OtherUsersGuard} from '../types/user';

export const userClient: UserClient = {
  create: (user, handle) =>
    http(post(user), endpoint.users, handle, {
      success: CurrentUserGuard,
      clientError: SignupValidationGuard
    }),

  getAll: (excludeId, handle) =>
    http(get(), `${endpoint.users}?exclude=${excludeId}`,
      handle, {
        success: OtherUsersGuard
      })
};
