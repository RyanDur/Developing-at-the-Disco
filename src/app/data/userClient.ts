import {CurrentUserGuard, OtherUsersPageGuard, SignupValidationGuard, UserClient} from './types';
import {http} from './http';
import {get, post} from './method';
import {endpoint} from '../../config';

const usersEndpoint = endpoint.users;

export const userClient: UserClient = {
  create: (user, handle) =>
    http(post(user, usersEndpoint), handle, {
      success: CurrentUserGuard,
      clientError: SignupValidationGuard
    }),

  getAll: (userId, handle) =>
    http(get(usersEndpoint, {
      exclude: userId,
      page: 0,
      size: Number.MAX_SAFE_INTEGER
    }), handle, {success: OtherUsersPageGuard})
};
