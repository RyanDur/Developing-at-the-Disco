import * as t from 'io-ts';
import {OtherUsersPageGuard} from '../../../../data/user/guard';

export type OtherUsersPage = t.TypeOf<typeof OtherUsersPageGuard>;
