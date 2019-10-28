import * as t from 'io-ts';
import {OtherUsers, OtherUsersGuard} from '../../types/user';
import {Page} from './page';

export const OtherUsersPageGuard = Page<OtherUsers>(OtherUsersGuard);

export type OtherUsersPage = t.TypeOf<typeof OtherUsersPageGuard>;
