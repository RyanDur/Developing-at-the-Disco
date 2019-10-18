import * as t from 'io-ts';

const ValidationType = t.type({
  value: t.string,
  validations: t.array(t.string)
});

export const SignupValidationGuard = t.type({
  username: ValidationType
});

export type UsernameValidation = t.TypeOf<typeof SignupValidationGuard>;
