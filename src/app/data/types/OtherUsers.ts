import * as t from 'io-ts';
import {OtherUserGuard} from './OtherUser';

export const OtherUsersGuard = t.array(OtherUserGuard);
