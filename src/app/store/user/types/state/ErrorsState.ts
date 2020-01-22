import {State} from '../../../../../lib/redux/types';
import {SignupErrors} from '..';

export interface ErrorsState extends State, SignupErrors {}
