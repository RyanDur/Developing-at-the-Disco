import {Validation} from '../store/user/types';

interface ViewText {
  [K: string]: string;
}

export const SignupText: ViewText = {
  USERNAME_EXISTS: 'Username already exists.'
};

export const translate = (validation: Validation = ({} as Validation), viewText: ViewText): Validation => {
  return validation.value ? {
    ...validation,
    validations: validation.validations.map(key => viewText[key])
  } : undefined;
};
