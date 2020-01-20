import * as t from 'io-ts';
import {UserStatus} from '../../../store/user/types/user';

export const UserStatusGuard = t.keyof({  // using "keyof" for better performance instead of "union"
  [UserStatus.LOGGED_OUT]: null,
  [UserStatus.AVAILABLE]: null
});
