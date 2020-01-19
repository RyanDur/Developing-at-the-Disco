import * as t from 'io-ts';
import {OtherUserGuard} from '../../../../data/user/guard';

export type OtherUser = t.TypeOf<typeof OtherUserGuard>;
