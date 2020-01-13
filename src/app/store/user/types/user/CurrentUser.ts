import * as t from 'io-ts';
import {CurrentUserGuard} from '../../../../data/types';

export type CurrentUser = t.TypeOf<typeof CurrentUserGuard>;
