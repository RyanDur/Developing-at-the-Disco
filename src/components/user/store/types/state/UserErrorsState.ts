import {SignupErrors} from '../../../Signup/types';
import {State} from '../../../../../lib/redux/types';

export interface UserErrorsState extends State, SignupErrors {}
