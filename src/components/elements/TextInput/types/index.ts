import {ErrorMessage} from '../../../../store/types';

export interface TextInputProps {
  onChange: (text: string) => void;
  className: string;
  maxLength: number;
  placeHolder: string;
  errors?: ErrorMessage[];
}

export interface TextInputState {
  text: string;
  isCandidate: boolean;
}
