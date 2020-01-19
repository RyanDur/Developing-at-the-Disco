import * as t from 'io-ts';
import {UserStatus} from '../../../store/user/types/user';

export const CurrentUserGuard = t.type({
  id: t.string,
  name: t.string,
  status: t.literal(UserStatus.AVAILABLE)
});
