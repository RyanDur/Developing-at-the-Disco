import {InvalidSignupAction, SignupValidations} from './types';
import {SignupErrors} from '../../../components/user/Signup/types';

export const invalidSignup = (errors: SignupErrors): InvalidSignupAction => ({
  type: SignupValidations.INVALID_SIGNUP,
  errors
});
