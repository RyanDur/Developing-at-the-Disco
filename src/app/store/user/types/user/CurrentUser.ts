import * as t from 'io-ts';
import {CurrentUserGuard} from '../../../../data/user/guard';

export type CurrentUser = t.TypeOf<typeof CurrentUserGuard>;
