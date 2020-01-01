import {SignupErrors} from '../../Signup/types';
import {InvalidSignupAction, SignupValidations} from './types';

export const invalidSignup = (errors: SignupErrors): InvalidSignupAction => ({
  type: SignupValidations.INVALID_SIGNUP,
  errors
});
