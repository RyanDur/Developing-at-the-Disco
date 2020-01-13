import * as t from 'io-ts';
import {OtherUsersGuard} from '../../../../data/user/types';

export type OtherUsers = t.TypeOf<typeof OtherUsersGuard>;
