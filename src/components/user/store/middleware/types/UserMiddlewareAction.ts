import {UserStoreAction} from '../../types';
import {SignupAction} from '../../../Signup/actions';

export type UserMiddlewareAction = UserStoreAction | SignupAction;
