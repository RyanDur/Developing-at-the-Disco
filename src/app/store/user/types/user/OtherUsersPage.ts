import * as t from 'io-ts';
import {OtherUsersPageGuard} from '../../../../data/types';

export type OtherUsersPage = t.TypeOf<typeof OtherUsersPageGuard>;
