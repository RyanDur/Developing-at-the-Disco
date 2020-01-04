import {Action} from '../../../../../store/redux/types';
import {SignupErrors} from '../../../Signup/types';
import {SignupValidations} from './SignupValidations';

export interface InvalidSignupAction extends Action<SignupValidations.INVALID_SIGNUP> {
  errors: SignupErrors;
}