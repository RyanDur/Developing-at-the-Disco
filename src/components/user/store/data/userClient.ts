import {SignupValidationGuard} from '../../Signup/types/UsernameValidation';
import {CurrentUserGuard} from '../types/user/CurrentUser';
import {OtherUsersPageGuard, UserClient} from './types';
import {http} from './http';
import {get, post} from './methods';
import {endpoint} from '../../../../config';

const usersEndpoint = endpoint.users;

export const userClient: UserClient = {
  create: (user, handle) =>
    http(post(user), usersEndpoint, handle, {
      success: CurrentUserGuard,
      clientError: SignupValidationGuard
    }),

  getAll: (excludeId, handle) =>
    http(get(), `${usersEndpoint}?exclude=${excludeId}&page=0&size=${Number.MAX_SAFE_INTEGER}`,
      handle, {
        success: OtherUsersPageGuard
      })
};
