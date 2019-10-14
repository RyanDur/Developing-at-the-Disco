import {ErrorMessage} from '../../../../store/types';

export interface SignupProps {
  createUser: (name: string) => void;
  userNameErrors?: ErrorMessage[];
}
