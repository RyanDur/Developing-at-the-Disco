import {Validation} from '../../../user/Signup/types';

export interface TextInputProps {
  onChange: (text: string) => void;
  className: string;
  maxLength: number;
  placeHolder: string;
  errors?: Partial<Validation>;
}

export interface TextInputState {
  text: string;
  isCandidate: boolean;
}
