import * as t from 'io-ts';
import {SignupValidationGuard} from '../../../../data/user/guard';

export type UsernameValidation = t.TypeOf<typeof SignupValidationGuard>;
