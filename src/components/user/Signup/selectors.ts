import {UserComponentState} from '../store/types/state';
import {Validation} from './types';
import {has} from '../../util/helpers';

const signupText: Record<string, string> = {
  USERNAME_EXISTS: 'Username already exists.'
};

export const translate = ({value, validations = []}: Partial<Validation>): Validation => ({
  value,
  validations: validations.map(validation => signupText[validation])
});

export const selectUsernameErrors = ({signup}: UserComponentState): any =>
  has(signup) ? translate(signup.username) : undefined;
