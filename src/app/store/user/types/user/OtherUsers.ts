import * as t from 'io-ts';
import {OtherUsersGuard} from '../../../../data/user/guard';

export type OtherUsers = t.TypeOf<typeof OtherUsersGuard>;
