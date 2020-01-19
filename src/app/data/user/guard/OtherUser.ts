import * as t from 'io-ts';
import {UserStatus} from '../../../store/user/types/user';

export const OtherUserGuard = t.type({
  id: t.string,
  name: t.string,
  status: t.literal(UserStatus.AVAILABLE) || t.literal(UserStatus.LOGGED_OUT)
});
