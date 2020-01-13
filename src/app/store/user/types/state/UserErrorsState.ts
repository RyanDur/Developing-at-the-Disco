import {State} from '../../../../../lib/redux/types';
import {SignupErrors} from '..';

export interface UserErrorsState extends State, SignupErrors {}
