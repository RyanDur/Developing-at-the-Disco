import * as t from 'io-ts';
import {UserStatusGuard} from './UserStatus';

export const OtherUserGuard = t.type({
  id: t.string,
  name: t.string,
  status: UserStatusGuard
});
