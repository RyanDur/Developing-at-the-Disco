import * as t from 'io-ts';
import {OtherUserGuard} from '../../../../data/user/types';

export type OtherUser = t.TypeOf<typeof OtherUserGuard>;
