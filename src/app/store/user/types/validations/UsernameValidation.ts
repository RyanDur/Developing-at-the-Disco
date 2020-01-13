import * as t from 'io-ts';
import {SignupValidationGuard} from '../../../../data/types';

export type UsernameValidation = t.TypeOf<typeof SignupValidationGuard>;
