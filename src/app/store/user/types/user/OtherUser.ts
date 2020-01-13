import * as t from 'io-ts';
import {OtherUserGuard} from '../../../../data/types/OtherUser';

export type OtherUser = t.TypeOf<typeof OtherUserGuard>;
