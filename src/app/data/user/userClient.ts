import {endpoint} from '../../../config';
import {http} from '../http';
import {get, patch, post} from '../method';
import {UserStatus} from '../../store/user/types/user';
import {UserClient} from './types';
import {CurrentUserGuard, OtherUsersPageGuard, SignupValidationGuard} from './guard';

const usersEndpoint = endpoint.users;
const {LOGGED_OUT} = UserStatus;

export const userClient: UserClient = {
  getAll: (userId, handle) =>
    http(get({
      exclude: userId,
      page: 0,
      size: Number.MAX_SAFE_INTEGER
    }, usersEndpoint), handle, {success: OtherUsersPageGuard}),

  create: (newUser, handle) =>
    http(post(newUser, usersEndpoint), handle, {
      success: CurrentUserGuard,
      clientError: SignupValidationGuard
    }),

  logout: (userId, handle) =>
    http(patch({status: LOGGED_OUT}, usersEndpoint, userId), handle)
};
