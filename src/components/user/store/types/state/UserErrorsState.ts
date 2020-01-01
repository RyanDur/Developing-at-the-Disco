import {SignupErrors} from '../../../Signup/types';
import {State} from '../../../../../store/redux/types';

export interface UserErrorsState extends State, SignupErrors {}
