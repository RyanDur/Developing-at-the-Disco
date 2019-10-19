import {Validation} from './UsernameValidation';

export interface SignupProps {
  createUser: (name: string) => void;
  userNameErrors?: Partial<Validation>;
}
