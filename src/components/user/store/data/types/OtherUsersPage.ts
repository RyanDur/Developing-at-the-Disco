import * as t from 'io-ts';
import {OtherUsersGuard} from '../../types/user';
import {Page} from './page';

export const OtherUsersPageGuard = Page(OtherUsersGuard);

export type OtherUsersPage = t.TypeOf<typeof OtherUsersPageGuard>;
