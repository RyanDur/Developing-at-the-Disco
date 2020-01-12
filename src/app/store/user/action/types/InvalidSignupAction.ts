import {SignupValidations} from './SignupValidations';
import {Action} from '../../../../../lib/redux/types';
import {SignupErrors} from '../../../../components/user/Signup/types';

export interface InvalidSignupAction extends Action<SignupValidations.INVALID_SIGNUP> {
  errors: SignupErrors;
}
