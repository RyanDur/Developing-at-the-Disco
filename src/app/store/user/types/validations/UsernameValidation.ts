import * as t from 'io-ts';
import {SignupValidationGuard} from '../../../../data/user/types';

export type UsernameValidation = t.TypeOf<typeof SignupValidationGuard>;
