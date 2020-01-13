import * as t from 'io-ts';
import {OtherUsersPageGuard} from '../../../../data/user/types';

export type OtherUsersPage = t.TypeOf<typeof OtherUsersPageGuard>;
