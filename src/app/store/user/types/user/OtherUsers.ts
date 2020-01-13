import * as t from 'io-ts';
import {OtherUsersGuard} from '../../../../data/types/OtherUsers';

export type OtherUsers = t.TypeOf<typeof OtherUsersGuard>;
