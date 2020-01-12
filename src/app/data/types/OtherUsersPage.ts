import * as t from 'io-ts';
import {Page} from './page';
import {OtherUsers, OtherUsersGuard} from '../../store/user/types/user';

export const OtherUsersPageGuard = Page<OtherUsers>(OtherUsersGuard);

export type OtherUsersPage = t.TypeOf<typeof OtherUsersPageGuard>;
