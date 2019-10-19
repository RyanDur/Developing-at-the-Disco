import {Action} from '../../../store/types';
import {SignupErrors} from './types';

export enum SignupValidations {
  INVALID_SIGNUP = 'INVALID_SIGNUP'
}

interface InvalidSignup extends Action<SignupValidations.INVALID_SIGNUP> {
  errors: SignupErrors;
}

export const invalidSignup = (errors: SignupErrors): InvalidSignup => ({
  type: SignupValidations.INVALID_SIGNUP,
  errors
});

export type SignupAction = InvalidSignup;