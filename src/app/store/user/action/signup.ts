import {InvalidSignupAction, SignupValidations} from './types';
import {SignupErrors} from '../types';

export const invalidSignup = (errors: SignupErrors): InvalidSignupAction => ({
  type: SignupValidations.INVALID_SIGNUP,
  errors
});
