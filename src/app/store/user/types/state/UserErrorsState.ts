import {State} from '../../../../../lib/redux/types';
import {SignupErrors} from '../../../../components/user/Signup/types';

export interface UserErrorsState extends State, SignupErrors {}
